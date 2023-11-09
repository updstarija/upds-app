import { useState, useMemo, memo } from "react";
import { View, useWindowDimensions } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { UseQueryResult } from "@tanstack/react-query";
import { Skeleton } from "moti/skeleton";
import { useThemeColor } from "@/hooks";
import { Etiqueta } from "@/components";
import { Texto } from "@/ui";
import { IRegistroHistorico, IResponseDetalleGrupo } from "@/types";

interface Props {
    materia: IRegistroHistorico;
    detalleGrupo: UseQueryResult<IResponseDetalleGrupo, unknown>;
}

export const MateriaChartsDetail: React.FC<Props> = memo(
    ({ materia, detalleGrupo }) => {
        const isDark = useThemeColor() === "dark";
        const { width } = useWindowDimensions();

        const [selectedDistribution, setSelectedDistribution] = useState<any>(null);

        const customDataPoint = () => {
            return (
                <View
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: "white",
                        borderWidth: 6,
                        borderRadius: 10,
                        borderColor: "#3867e6",
                    }}
                />
            );
        };

        const customLabel = (val: any) => {
            return (
                <View style={{ width: 90, marginLeft: 7 }}>
                    <Texto className="text-white text-center" weight="Bold">
                        {val}
                    </Texto>
                </View>
            );
        };

        const promedio = [
            { value: materia.nota, frontColor: "#177AD5" },
            {
                value: detalleGrupo.data?.data.detalleNotas.promedio,
                frontColor: "#ED6665",
            },
        ];

        const average = [
            {
                value: detalleGrupo.data?.data.detalleNotas.notaMinima,
                labelComponent: () => customLabel("Nota\nMinima"),
                customDataPoint: customDataPoint,
            },
            {
                value: detalleGrupo.data?.data.informacion.nota,
                customDataPoint: customDataPoint,
                showStrip: true,
                stripColor: isDark ? "#fff" : "#0D1F46",
                dataPointLabelComponent: () => {
                    return (
                        <View className="rounded-md bg-[#0D1F46] p-1 dark:bg-[#223B82]">
                            <Texto className="text-white">Mi Nota</Texto>
                        </View>
                    );
                },
                dataPointLabelShiftY: 15,
                dataPointLabelShiftX: -15,
            },
            {
                value: detalleGrupo.data?.data.detalleNotas.notaMaxima,
                labelComponent: () => customLabel("Nota\nMaxima"),
                customDataPoint: customDataPoint,
            },
        ];

        const qualificationDistribution = useMemo(() => {
            if (!detalleGrupo.data) return [];

            const colores = {
                Estratégico: "#4896fd",
                Autónomo: "#6afd6a",
                Resolutivo: "#fccb70",
                Receptivo: "#cf31cf",
                Preformal: "#f15c5c",
            };

            const coloresGradient = {
                Estratégico: "#006DFF",
                Autónomo: "#00FF00",
                Resolutivo: "#FFA500",
                Receptivo: "#800080",
                Preformal: "#FF0000",
            };

            const parsedData = detalleGrupo.data.data.distribucionNotas.map(
                (item) => ({
                    value: item.porcentaje,
                    color: colores[item.tipo],
                    gradientCenterColor: coloresGradient[item.tipo],
                    text: item.porcentaje + "%",
                    tipo: item.tipo,
                    cantidad: item.cantidad,
                    focused: false,
                })
            );

            const maxPorcentaje = Math.max(...parsedData.map((item) => item.value));

            parsedData.forEach((item) => {
                if (item.value === maxPorcentaje) {
                    item.focused = true;
                    setSelectedDistribution(item);
                    return;
                }
            });

            return parsedData;
        }, [detalleGrupo.data]);

        const maxDistribution = useMemo(() => {
            const dataParsed = qualificationDistribution;
            const notasOrdenadas = dataParsed.sort((a, b) => b.value - a.value);

            /* @ts-ignore */
            return notasOrdenadas[0];
        }, [selectedDistribution]);

        const isPendiente = materia.estado.id == 0;
        // const isAprobado = materia.estado.id == 1;
        // const isReprobado = materia.estado.id == 2;


        return (
            <View className="bg-white dark:bg-secondary-dark mt-6">
                {isPendiente ?
                    <View className='items-center bg-primario dark:bg-secondary-dark p-4 rounded-2xl'>
                        <Texto className='text-white'>La materia esta en curso. Vuelva Pronto :)</Texto>
                    </View> :
                    <View className="flex-col gap-5">
                        <View className="rounded-2xl bg-[#223B82] p-5 dark:bg-[#0D1F46] ">
                            <Texto
                                className="text-center text-lg uppercase text-white"
                                weight="Bold"
                            >
                                Nota y promedio del curso
                            </Texto>
                            <View className="mx-auto">
                                {detalleGrupo.isLoading ? (
                                    <Skeleton
                                        colorMode={"light"}
                                        width={220}
                                        height={240}
                                        colors={['#243E89', '#2F489C', '#3752AD']}
                                    />
                                ) : (
                                    <BarChart
                                        data={promedio}
                                        showYAxisIndices
                                        noOfSections={4}
                                        spacing={24}
                                        barWidth={70}
                                        xAxisThickness={0}
                                        yAxisThickness={0}
                                        yAxisTextStyle={{ color: "#fff" }}
                                        maxValue={100}
                                        isAnimated
                                        barMarginBottom={0}
                                        renderTooltip={(item: any, index: any) => (
                                            <View
                                                style={{
                                                    marginBottom: 20,
                                                    marginLeft: -6,
                                                    backgroundColor: isDark ? "#223B82" : "#fff",
                                                    paddingHorizontal: 6,
                                                    paddingVertical: 4,
                                                    borderRadius: 4,
                                                }}
                                            >
                                                <Texto className="text-black dark:text-white">
                                                    {item.value}
                                                </Texto>
                                            </View>
                                        )}
                                    />
                                )}

                                <View className="mt-5 flex-1 flex-row justify-evenly">
                                    <Etiqueta color="#177AD5" label="Mi nota" />
                                    <Etiqueta color="#ED6665" label="Promedio del curso" />
                                </View>
                            </View>
                        </View>

                        <View className="rounded-2xl bg-[#223B82] p-5 dark:bg-[#0D1F46]">
                            <Texto
                                className="text-center text-lg uppercase text-white"
                                weight="Bold"
                            >
                                Distribucion de Notas
                            </Texto>

                            <View className="mx-auto my-5">
                                {detalleGrupo.isLoading
                                    ?
                                    <Skeleton colorMode={'light'} width={195} height={195} colors={['#243E89', '#2F489C', '#3752AD']} radius={"round"} />
                                    :
                                    <PieChart
                                        data={qualificationDistribution}
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
                                        innerCircleColor={isDark ? "#0D1F46" : "#223B82"}
                                        innerCircleBorderWidth={1}
                                        innerCircleBorderColor={"white"}
                                        strokeColor="white"
                                        strokeWidth={1}
                                        centerLabelComponent={() => {
                                            let nota = maxDistribution;
                                            return (
                                                <View
                                                    style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
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
                                }

                            </View>

                            <View className="flex gap-y-2">
                                <View className="flex-row justify-evenly">
                                    <Etiqueta
                                        color="#006DFF"
                                        label={`Estrategico (85-100)   ${detalleGrupo.data?.data.distribucionNotas.find(
                                            (x) => x.tipo === "Estratégico"
                                        )?.cantidad
                                            }`}
                                        classNameContainer="mb-1"
                                    />
                                    <Etiqueta
                                        color="#008f00"
                                        label={`Autonomo (70-84)   ${detalleGrupo.data?.data.distribucionNotas.find(
                                            (x) => x.tipo === "Autónomo"
                                        )?.cantidad
                                            }`}
                                        classNameContainer="mb-1"
                                    />
                                </View>

                                <View className="flex-row justify-evenly">
                                    <Etiqueta
                                        color="#c27e00"
                                        label={`Resolutivo (51-69)   ${detalleGrupo.data?.data.distribucionNotas.find(
                                            (x) => x.tipo === "Resolutivo"
                                        )?.cantidad
                                            }`}
                                        classNameContainer="mb-1"
                                    />
                                    <Etiqueta
                                        color="#800080"
                                        label={`Receptivo (25-50)  ${detalleGrupo.data?.data.distribucionNotas.find(
                                            (x) => x.tipo === "Receptivo"
                                        )?.cantidad
                                            }`}
                                        classNameContainer="mb-1"
                                    />
                                </View>

                                <View>
                                    <Etiqueta
                                        color="#FF0000"
                                        label={`Preformal (0-24)   ${detalleGrupo.data?.data.distribucionNotas.find(
                                            (x) => x.tipo === "Preformal"
                                        )?.cantidad
                                            }`}
                                    />
                                </View>
                            </View>
                        </View>

                        <View className="rounded-2xl bg-[#223B82] p-5 dark:bg-[#0D1F46]">
                            <Texto
                                className="text-center text-lg uppercase text-white"
                                weight="Bold"
                            >
                                Detalle notas
                            </Texto>

                            <View className="mx-auto mt-5 p-3">
                                {detalleGrupo.isLoading ? (
                                    <Skeleton
                                        colorMode={"light"}
                                        width={250}
                                        height={240}
                                        colors={['#243E89', '#2F489C', '#3752AD']}
                                    />
                                ) :

                                    <LineChart
                                        thickness={3}
                                        color={isDark ? "#fff" : "#091f4e"}
                                        maxValue={100}
                                        noOfSections={5}
                                        width={width - 180}
                                        areaChart
                                        yAxisTextStyle={{ color: "#Fff" }}
                                        //@ts-ignore
                                        data={average}
                                        initialSpacing={20}
                                        spacing={90}
                                        endSpacing={40}
                                        startFillColor={isDark ? "#223B82" : "#168aad"}
                                        endFillColor={isDark ? "#223B82" : "#3687a0"}
                                        startOpacity={0.4}
                                        endOpacity={0.4}
                                        yAxisColor="#0D1F46"
                                        xAxisColor="#0D1F46"
                                        pointerConfig={{
                                            pointerStripUptoDataPoint: true,
                                            pointerStripWidth: 2,
                                            strokeDashArray: [2, 5],
                                            pointerColor: "#223B82",
                                            radius: 4,
                                            pointerLabelWidth: 100,
                                            pointerLabelHeight: 120,
                                            pointerLabelComponent: (items: any) => {
                                                return (
                                                    <View className="flex w-14 items-center justify-center rounded-xl border bg-[#0D1F46] p-2 dark:bg-[#223B82]">
                                                        <Texto className="text-white" weight="Bold">
                                                            {items[0].value}
                                                        </Texto>
                                                    </View>
                                                );
                                            },
                                        }}
                                    />
                                }

                            </View>
                        </View>
                    </View>
                }
            </View>
        );
    }
);

export default MateriaChartsDetail;
