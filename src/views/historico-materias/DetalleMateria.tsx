import { useState, useMemo, useCallback, useRef, memo } from 'react';
import { ActivityIndicator, ScrollView, View, useColorScheme } from 'react-native';
// import {
//  BottomSheetScrollView,
//  BottomSheetBackdrop,
//  BottomSheetModal,
//} from '@gorhom/bottom-sheet';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { Texto, Button, Etiqueta } from '../../components';
import { IPlanEstudio } from '@/types';
import { useDetalleGrupoMateria, useThemeColor } from '@/hooks';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, TouchableOpacity } from '@gorhom/bottom-sheet';
import PagerView from 'react-native-pager-view';
import BottomSheet from '@gorhom/bottom-sheet';


interface Props {
  plan: IPlanEstudio;
}

export const DetalleMateria: React.FC<Props> = memo(({ plan }) => {
  const isDarkMode = useThemeColor() === 'dark';

  //const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef = useRef<any>(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const snapPoints = useMemo(() => ['35%', '60%', '90%'], []);

  const [selectedDistribution, setSelectedDistribution] = useState<any>(null);
  const [distribucionNotas, setDistribucionNotas] = useState([]);

  const { detalleGrupoMateriaQuery: data } = useDetalleGrupoMateria({
    grupo: plan.grupo || 0,
    enabled: visibleModal,
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index >= 0) setVisibleModal(true);
    else setVisibleModal(false);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <>

        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />

      </>
    ),
    [],
  );

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderWidth: 6,
          borderRadius: 10,
          borderColor: '#3867e6',
        }}
      />
    );
  };

  const customLabel = (val: any) => {
    return (
      <View style={{ width: 90, marginLeft: 7 }}>
        <Texto className='text-white' weight="Bold">{val}</Texto>
      </View>
    );
  };

  const getNota = () => {
    const result = parseInt(plan.nota);
    if (result) return true;
    return false;
  };

  const notaPromedioData = [
    { value: parseInt(plan.nota), frontColor: '#177AD5' },
    { value: data.data?.data.detalleNotas.promedio, frontColor: '#ED6665' },
  ];

  const detalleNotasData = [
    {
      value: data.data?.data.detalleNotas.notaMinima,
      labelComponent: () => customLabel('Minima'),
      customDataPoint: customDataPoint,
    },
    {
      value: data.data?.data.informacion.nota,
      customDataPoint: customDataPoint,
      showStrip: true,
      stripColor: isDarkMode ? '#fff' : '#0D1F46',
      dataPointLabelComponent: () => {
        return (
          <View className="rounded-md bg-[#0D1F46] p-1 dark:bg-[#223B82]">
            <Texto className='text-white'>Mi Nota</Texto>
          </View>
        );
      },
      dataPointLabelShiftY: 15,
      dataPointLabelShiftX: -15,
    },
    {
      value: data.data?.data.detalleNotas.notaMaxima,
      labelComponent: () => customLabel('Maxima'),
      customDataPoint: customDataPoint,
    },
  ];

  const parseDistribucion = useMemo(() => {
    if (!data.data) return [];

    const colores = {
      Estratégico: '#4896fd',
      Autónomo: '#6afd6a',
      Resolutivo: '#fccb70',
      Receptivo: '#cf31cf',
      Preformal: '#f15c5c',
    };

    const coloresGradient = {
      Estratégico: '#006DFF',
      Autónomo: '#00FF00',
      Resolutivo: '#FFA500',
      Receptivo: '#800080',
      Preformal: '#FF0000',
    };

    const parsedData = data.data.data.distribucionNotas.map(item => ({
      value: item.porcentaje,
      color: colores[item.tipo],
      gradientCenterColor: coloresGradient[item.tipo],
      text: item.porcentaje + '%',
      tipo: item.tipo,
      cantidad: item.cantidad,
      focused: false,
    }));

    const maxPorcentaje = Math.max(...parsedData.map(item => item.value));

    parsedData.forEach(item => {
      if (item.value === maxPorcentaje) {
        item.focused = true;
        setSelectedDistribution(item);
        return;
      }
    });

    return parsedData;
  }, [data.data]);

  const maxDistribucion = useMemo(() => {
    const dataParsed = parseDistribucion;
    const notasOrdenadas = dataParsed.sort((a, b) => b.value - a.value);

    /* @ts-ignore */
    return notasOrdenadas[0];
  }, [selectedDistribution]);

  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
      text: '2 %',
      tipo: 'XYZ',
      cantidad: 33,
    },
    {
      value: 40,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      text: '2 %',
      tipo: 'XYZ',
      cantidad: 33,
    },
    {
      value: 16,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
      text: '2 %',
      tipo: 'XYZ',
      cantidad: 33,
    },
    {
      value: 3,
      color: '#FFA5BA',
      gradientCenterColor: '#FF7F97',
      text: '2 %',
      tipo: 'XYZ',
      cantidad: 33,
    },
  ];
  return (
    <View>
      <Button
        classNameBtn={`px-3 py-4 flex-row justify-between items-center ${parseInt(plan.nota) < 51 ? 'bg-[#fe9d9d]' : ''
          } `}
        onPress={handlePresentModalPress}
        disabled={!getNota()}>
        <Texto className="text-center text-white">{plan.nombre}</Texto>
        <Texto className="text-center text-white">
          {parseInt(plan.nota) || 'Pendiente'} {plan.nota}
        </Texto>
      </Button>


      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#0D1F46' }}
        backgroundStyle={{ backgroundColor: isDarkMode ? '#040e22' : '#fff' }}>
        {visibleModal && (
          <>
            {data.isLoading ? (
              <View className="p-28">
                <ActivityIndicator color="#223B82" size={50} />
              </View>
            ) : (

              <PagerView initialPage={1} className='flex-1'>
                <BottomSheetScrollView key="1" showsVerticalScrollIndicator={false}>
                  <View className="flex gap-y-4 p-5 flex-1">
                    <Texto
                      className="text-center text-xl text-black dark:text-white"
                      weight="Bold">
                      DETALLE DE LA MATERIA
                    </Texto>

                    <View className="flex gap-y-3">
                      <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                          Materia:
                        </Texto>
                        <Texto className="text-black dark:text-white">
                          {data.data?.data.informacion.materia}
                        </Texto>
                      </View>

                      <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                          Grupo:
                        </Texto>
                        <Texto className="text-black dark:text-white">
                          {data.data?.data.informacion.grupo}
                        </Texto>
                      </View>

                      <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                          Horario:
                        </Texto>
                        <Texto className="text-black dark:text-white">
                          {data.data?.data.informacion.horario}
                        </Texto>
                      </View>

                      <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                          Modulo:
                        </Texto>
                        <Texto className="text-black dark:text-white">
                          {data.data?.data.informacion.modulo}
                        </Texto>
                      </View>

                      <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                          Docente:
                        </Texto>
                        <Texto className="text-black dark:text-white">
                          {data.data?.data.informacion.docente}
                        </Texto>
                      </View>

                      <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                          Nota:
                        </Texto>
                        <Texto className="text-black dark:text-white">
                          {data.data?.data.informacion.nota}
                        </Texto>
                      </View>
                    </View>

                    <View className="rounded-2xl bg-[#223B82] p-5 dark:bg-[#0D1F46] ">
                      <Texto
                        className="text-center text-lg uppercase text-white"
                        weight="Bold">
                        Nota y promedio del curso
                      </Texto>
                      <View className="mx-auto">
                        <BarChart
                          data={notaPromedioData}
                          showYAxisIndices
                          noOfSections={4}

                          spacing={24}
                          barWidth={70}
                          xAxisThickness={0}
                          yAxisThickness={0}
                          yAxisTextStyle={{ color: '#fff' }}
                          maxValue={100}
                          isAnimated
                          barMarginBottom={0}
                          renderTooltip={(item: any, index: any) => (
                            <View
                              style={{
                                marginBottom: 20,
                                marginLeft: -6,
                                backgroundColor: isDarkMode ? '#223B82' : '#fff',
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                                borderRadius: 4,
                              }}>
                              <Texto className="text-white">{item.value}</Texto>
                            </View>
                          )}
                        />

                        <View className="mt-5 flex-1 flex-row justify-evenly">
                          <Etiqueta color="#177AD5" label="Mi nota" />
                          <Etiqueta color="#ED6665" label="Promedio del curso" />
                        </View>
                      </View>
                    </View>



                    <View className="rounded-2xl bg-[#223B82] p-5 dark:bg-[#0D1F46]">
                      <Texto
                        className="text-center text-lg uppercase text-white"
                        weight="Bold">
                        Distribucion de Notas
                      </Texto>

                      <View className="mx-auto my-5">
                        <PieChart
                          data={parseDistribucion}
                          donut
                          showText
                          textColor="white"
                          textSize={10}
                          focusOnPress
                          onPress={(x: any) => setSelectedDistribution(x)}
                          textBackgroundColor="red"
                          showGradient
                          sectionAutoFocus
                          radius={90}
                          innerRadius={50}
                          innerCircleColor={isDarkMode ? '#0D1F46' : '#223B82'}
                          innerCircleBorderWidth={1}
                          innerCircleBorderColor={'white'}
                          strokeColor="white"
                          strokeWidth={1}
                          centerLabelComponent={() => {
                            let nota = maxDistribucion;
                            return (
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Texto className="text-2xl text-white" weight="Bold">
                                  {selectedDistribution.cantidad}
                                </Texto>
                                <Texto className="text-xs uppercase text-white">
                                  {selectedDistribution.tipo}
                                </Texto>
                              </View>
                            );
                          }}
                        />
                      </View>

                      <View className="flex gap-y-2">
                        <View className="flex-row justify-evenly">
                          <Etiqueta
                            color="#006DFF"
                            label={`Estrategico (85-100) ${data.data?.data.distribucionNotas.find(
                              x => x.tipo === 'Estratégico',
                            )?.cantidad
                              }`}
                            classNameContainer="mb-1"
                          />
                          <Etiqueta
                            color="#008f00"
                            label={`Autonomo (70-84)  ${data.data?.data.distribucionNotas.find(
                              x => x.tipo === 'Autónomo',
                            )?.cantidad
                              }`}
                            classNameContainer="mb-1"
                          />
                        </View>

                        <View className="flex-row justify-evenly">
                          <Etiqueta
                            color="#c27e00"
                            label={`Resolutivo (51-69)  ${data.data?.data.distribucionNotas.find(
                              x => x.tipo === 'Resolutivo',
                            )?.cantidad
                              }`}
                            classNameContainer="mb-1"
                          />
                          <Etiqueta
                            color="#800080"
                            label={`Receptivo (25-50)  ${data.data?.data.distribucionNotas.find(
                              x => x.tipo === 'Receptivo',
                            )?.cantidad
                              }`}
                            classNameContainer="mb-1"
                          />
                        </View>

                        <View>
                          <Etiqueta
                            color="#FF0000"
                            label={`Preformal (0-24)  ${data.data?.data.distribucionNotas.find(
                              x => x.tipo === 'Preformal',
                            )?.cantidad
                              }`}
                          />
                        </View>
                      </View>
                    </View>

                    <View className="rounded-2xl bg-[#223B82] p-5 dark:bg-[#0D1F46]">
                      <Texto
                        className="text-center text-lg uppercase text-white"
                        weight="Bold">
                        Detalle notas
                      </Texto>

                      <View className="mx-auto mt-5 p-3">
                        <LineChart
                          thickness={3}
                          color={isDarkMode ? '#fff' : '#091f4e'}
                          maxValue={100}
                          noOfSections={4}
                          areaChart
                          yAxisTextStyle={{ color: '#Fff' }}
                          //@ts-ignore 
                          data={detalleNotasData}
                          spacing={70}
                          startFillColor={isDarkMode ? '#223B82' : '#168aad'}
                          endFillColor={isDarkMode ? '#223B82' : '#3687a0'}
                          startOpacity={0.4}
                          endOpacity={0.4}
                          yAxisColor="#0D1F46"
                          xAxisColor="#0D1F46"
                          pointerConfig={{
                            pointerStripUptoDataPoint: true,
                            pointerStripWidth: 2,
                            strokeDashArray: [2, 5],
                            pointerColor: '#223B82',
                            radius: 4,
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 120,
                            pointerLabelComponent: (items: any) => {
                              return (
                                <View className="flex w-14 items-center justify-center rounded-xl border bg-[#0D1F46] p-2 dark:bg-[#223B82]">
                                  <Texto
                                    style={{ color: 'white', fontWeight: 'bold' }}>
                                    {items[0].value}
                                  </Texto>
                                </View>
                              );
                            },
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </BottomSheetScrollView>

                <View key="2">
                  <Texto>PREREQUISTOS</Texto>
                  <Texto>...............</Texto>
                  <Texto>HABILITA2</Texto>
                  <Texto>...............</Texto>



                </View>
              </PagerView>

            )}
          </>
        )}
      </BottomSheetModal>

    </View>
  );
});

