import { useState, useMemo, useCallback, useRef, memo, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { IRegistroHistorico, Turno } from '@/types';
import { useDetalleGrupoMateria, useThemeColor } from '@/hooks';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { etiquetas } from '@/data';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';
import { formatFechaDMY } from '@/helpers';
import { differenceInMonths } from 'date-fns';
import { Button, Etiqueta, Spinner } from '../../components';
import { RequisitoMateria } from '../proyecciones';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheet, Texto } from '@/ui';

interface Props {
  materia: IRegistroHistorico;
  view: "detalle-materia" | "requisitos"
}

export const DetalleMateriaV3: React.FC<Props> = memo(({ materia: plan, view }) => {
  const isPendiente = plan.estado.id == 0
  const isAprobado = plan.estado.id == 1
  const isReprobado = plan.estado.id == 2
  const isValidMateria = isPendiente || isAprobado || isReprobado

  const isMateriaEn4Meses = () => {
    const actualFecha = new Date()
    const fechaModulo = new Date(plan.fechaRegistro || "")
    return differenceInMonths(actualFecha, fechaModulo) < 3
  }


  const leftContent = () => {
    const isValid = isMateriaEn4Meses()

    return (
      <>
        <MaterialCommunityIcons.Button
          onPress={() => router.push(`/evaluacion/${plan.grupo}`)}
          name="clipboard-check"
          size={30}
          color="#fff"
          disabled={!isValid}
          style={{ paddingRight: 0, opacity: !isValid ? 0.5 : 1 }}
        />

        <MaterialCommunityIcons.Button
          onPress={() => router.push(`/moodle/${plan.moodle}`)}
          name="school"
          size={30}
          color="#fff"
          backgroundColor={"rgb(251 146 60)"}
          disabled={!isValid}
          style={{ paddingRight: 0, opacity: !isValid ? 0.5 : 1 }}
        />
        {/*  <RectButton>
          <Link href={`/evaluacion/${plan.grupo}`} disabled={!isValid} className='bg-red-200'>
            <View className={`items-center justify-center flex-1 bg-cyan-600 p-2 ${!isValid ? "opacity-60" : ""}`}>
              <MaterialCommunityIcons
                name="clipboard-check"
                size={30}
                color="#fff"

              />
            </View>
          </Link>


        </RectButton>

        <RectButton>
          <Link href={`/moodle/${plan.moodle}`} disabled={!isValid}>

            <View className={`items-center justify-center flex-1 bg-orange-400 p-2 ${!isValid ? "opacity-60" : ""}`}>
              <MaterialCommunityIcons
                name="school"
                size={30}
                color="#fff"

              />
            </View>

          </Link>

        </RectButton> */}

        {/*  <Link href={`/evaluacion/${plan.grupo}`} asChild disabled={!isValid} className='bg-red-200'>
          <TouchableOpacity className='flex-1 opacity-60'>
            <View className={`items-center justify-center flex-1 bg-cyan-600 p-2 ${!isValid ? "opacity-60" : ""}`}>
              <MaterialCommunityIcons
                name="clipboard-check"
                size={30}
                color="#fff"

              />
            </View>
          </TouchableOpacity>
        </Link>

        <Link href={`/moodle/${plan.moodle}`} asChild disabled={!isValid}>
          <TouchableOpacity className='flex-1'>
            <View className={`items-center justify-center flex-1 bg-orange-400 p-2 ${!isValid ? "opacity-60" : ""}`}>
              <MaterialCommunityIcons
                name="school"
                size={30}
                color="#fff"

              />
            </View>
          </TouchableOpacity>
        </Link> */}



      </>
    );
  };

  const rightContent = () => {
    return (
      <View className='items-center justify-center p-2'>
        <View className='flex-col items-center'>
          <Texto weight='Bold'>Fecha Registro</Texto>
          <Texto>{formatFechaDMY(plan.fechaRegistro)}</Texto>
        </View>
      </View>
    )
  }

  /* useEffect(() => {

    swipeRef.current?.openRight()
  }, [swipeRef]) */





  return (
    <View className='bg-white dark:bg-secondary-dark'>
      {/*  <Swipeable
        ref={swipeRef}
        enabled={plan.estado.id >= 0 && plan.estado.id != 6}
        renderRightActions={rightContent}
        renderLeftActions={leftContent}>
        <View style={{ position: "relative", overflow: "hidden" }}>
          <Button
            classNameBtn={`px-3 py-4 flex-row justify-between items-center bg-white dark:bg-secondary-dark
          `}
            onPress={handlePresentModalPress}
            disabled={plan.estado.id < 0 || plan.estado.id == 6}

          >
            <Texto className="text-center text-black dark:text-white">{plan.nombre}</Texto>
            <Texto className="text-center text-black dark:text-white">
              {plan.estado.id < 0 ? "S/C" : plan.nota}
            </Texto>
          </Button>
        </View>


        {isValidMateria && <>
          <View style={{ borderBottomColor: etiquetas[plan.estado.id].color, borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

          <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
            <FontAwesome name={etiquetas[plan.estado.id].icon} color={"#FFF"} />
          </View>
        </>}

      </Swipeable> */}


      {/*  <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#0D1F46' }}
        backgroundStyle={{ backgroundColor: isDarkMode ? '#040e22' : '#fff' }}>
        {visibleModal && (
          <>
            {renderContentSheetModal()}
          </>
        )}
      </BottomSheetModal> */}
      <View style={{ position: "relative", overflow: "hidden" }}>
        <View
          className={`px-3 py-4 flex-row justify-between items-center bg-white dark:bg-secondary-dark
          `}
        >
          <Texto className="text-center text-black dark:text-white">{plan.nombre}</Texto>
          <Texto className="text-center text-black dark:text-white">
            {plan.estado.id < 0 ? "S/C" : plan.nota}
          </Texto>
        </View>

        {isValidMateria && <>
          <View style={{ borderBottomColor: etiquetas[plan.estado.id].color, borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

          <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
            <FontAwesome name={etiquetas[plan.estado.id].icon} color={"#FFF"} />
          </View>
        </>}
      </View>
      {/*     <BottomSheet content={<>
        <View style={{ position: "relative", overflow: "hidden" }}>
          <View
            className={`px-3 py-4 flex-row justify-between items-center bg-white dark:bg-secondary-dark
          `}
          >
            <Texto className="text-center text-black dark:text-white">{plan.nombre}</Texto>
            <Texto className="text-center text-black dark:text-white">
              {plan.estado.id < 0 ? "S/C" : plan.nota}
            </Texto>
          </View>
        </View>


        {isValidMateria && <>
          <View style={{ borderBottomColor: etiquetas[plan.estado.id].color, borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

          <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
            <FontAwesome name={etiquetas[plan.estado.id].icon} color={"#FFF"} />
          </View>
        </>}
      </>} touchableProps={{ activeOpacity: 0.8 }} snapPointsProp={["40%"]}>
        <RequisitoMateria
          //@ts-ignore
          materia={{
            carrera: "awd",
            estado: plan.estado,
            id: plan.id,
            materia: plan.nombre,
            materiaAdmId: plan.id,
            modulo: "",
            semestre: "4",

          }} />
      </BottomSheet> */}

      {/*  <BottomSheet content={<>
        <View style={{ position: "relative", overflow: "hidden" }}>
          <View
            className={`px-3 py-4 flex-row justify-between items-center bg-white dark:bg-secondary-dark
          `}
          >
            <Texto className="text-center text-black dark:text-white">{plan.nombre}</Texto>
            <Texto className="text-center text-black dark:text-white">
              {plan.estado.id < 0 ? "S/C" : plan.nota}
            </Texto>
          </View>
        </View>


        {isValidMateria && <>
          <View style={{ borderBottomColor: etiquetas[plan.estado.id].color, borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

          <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
            <FontAwesome name={etiquetas[plan.estado.id].icon} color={"#FFF"} />
          </View>
        </>}
      </>} touchableProps={{ activeOpacity: 0.8 }} snapPointsProp={["40%"]}>
        <RequisitoMateria
          //@ts-ignore
          materia={{
            carrera: "awd",
            estado: plan.estado,
            id: plan.id,
            materia: plan.nombre,
            materiaAdmId: plan.id,
            modulo: "",
            semestre: "4",

          }} />
      </BottomSheet> */}


    </View>
  );
});

export default DetalleMateriaV3
