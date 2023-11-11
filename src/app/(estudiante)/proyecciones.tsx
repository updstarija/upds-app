import { useState, useRef } from "react";
import { Text, View, FlatList, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useBoleta,
  useCarreraContext,
  useCarreras,
  useModulos,
  useSemestres,
  useThemeColor,
} from "@/hooks";
import { DetalleBoleta, DetalleMateriasSemestre } from "@/views/proyecciones";
import { Button } from "@/components";
import Modal from "react-native-modal";
import Icon from "@expo/vector-icons/FontAwesome";
import { COLORS } from "~/constants";
import { CustomModal, Texto } from "@/ui";

const ProjectionsScreen = () => {
  const isDarkMode = useThemeColor() === "dark";
  const flatListRef = useRef<FlatList | null>(null);
  const boletaRef = useRef<View | null>(null);

  const {
    carrerasQuery: carreras,
    valueCarrera,
    setValueCarrera,
  } = useCarreraContext();

  const [semestreOpen, setSemestreOpen] = useState(-1);

  const onChangeSemestre = (val: number) => {
    if (val === semestreOpen) {
      setSemestreOpen(-1);
      return;
    }
    setSemestreOpen(val);
  };

  const [openCarrera, setOpenCarrera] = useState(false);
  const [openModulo, setOpenModulo] = useState(false);
  const [valueModulo, setvalueModulo] = useState<number | null>(null);

  const { carrerasQuery } = useCarreras();
  const { semestresQuery } = useSemestres({ carrera: valueCarrera || -1 });
  const { modulosQuery } = useModulos();

  if (carrerasQuery.isLoading) return <Text>Cargando....</Text>;
  if (carrerasQuery.isError) return <Text>Hubo un error....</Text>;

  const scrollToTop = () => {
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderModulos = () => {
    if (modulosQuery.isLoading) return <Text>CARGANDO MODULOS..</Text>;
    if (modulosQuery.isError) return <Text>HUBO UN ERROR MODYLO..</Text>;

    if (!valueModulo) {
      setvalueModulo(modulosQuery.data.data[0].id);
    }

    return (
      <>
        <DropDownPicker
          open={openModulo}
          value={valueModulo}
          maxHeight={400}
          // @ts-ignore
          items={modulosQuery.data.data}
          setOpen={setOpenModulo}
          setValue={setvalueModulo}
          placeholder="Selecciona el modulo"
          zIndex={1}
          schema={{
            label: "nombre",
            value: "id",
          }}
          ArrowDownIconComponent={() => (
            <Icon
              size={18}
              color={isDarkMode ? "#fff" : "#000"}
              style={{ paddingHorizontal: 5 }}
              name="angle-down"
            />
          )}
          textStyle={{ color: isDarkMode ? "#fff" : "#000" }}
          ArrowUpIconComponent={() => (
            <Icon
              size={18}
              color={isDarkMode ? "#fff" : "#000"}
              style={{ paddingHorizontal: 5 }}
              name="angle-up"
            />
          )}
          TickIconComponent={() => (
            <Icon
              size={18}
              color={isDarkMode ? "#fff" : "#000"}
              style={{ paddingHorizontal: 5 }}
              name="check"
            />
          )}
          style={
            isDarkMode
              ? { backgroundColor: COLORS.dark.secondary }
              : { backgroundColor: "#fff" }
          }
          dropDownContainerStyle={
            isDarkMode && { backgroundColor: COLORS.dark.secondary }
          }
        />
      </>
    );
  };

  const renderCarreras = () => (
    <DropDownPicker
      open={openCarrera}
      value={valueCarrera}
      // @ts-ignore
      items={carreras.data}
      setOpen={setOpenCarrera}
      setValue={setValueCarrera}
      placeholder="Selecciona la carrera"
      zIndex={1}
      ArrowDownIconComponent={() => (
        <Icon
          size={18}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ paddingHorizontal: 5 }}
          name="angle-down"
        />
      )}
      ArrowUpIconComponent={() => (
        <Icon
          size={18}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ paddingHorizontal: 5 }}
          name="angle-up"
        />
      )}
      TickIconComponent={() => (
        <Icon
          size={18}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ paddingHorizontal: 5 }}
          name="check"
        />
      )}
      schema={{
        label: "nombre",
        value: "id",
      }}
      textStyle={{ color: isDarkMode ? "#fff" : "#000" }}
      style={
        isDarkMode
          ? { backgroundColor: COLORS.dark.secondary }
          : { backgroundColor: "#fff" }
      }
      dropDownContainerStyle={
        isDarkMode && { backgroundColor: COLORS.dark.secondary }
      }
    />
  );

  const renderBoleta = () => (
    <>
      {valueCarrera ? (
        <View ref={boletaRef}>
          <DetalleBoleta carrera={valueCarrera} />
        </View>
      ) : (
        <Texto className="mt-5 text-black">
          POR FAVOR SELECCIONE UNA CARRERA
        </Texto>
      )}
    </>
  );

  const renderHeaderBody = () => (
    <View className="bg-white p-2 dark:bg-primario-dark">
      <Text className="my-4 text-center text-xl font-weight='Bold' uppercase text-black dark:text-white">
        Boleta de proyeccion semestral
      </Text>

      <View style={{ zIndex: 1 }}>{renderCarreras()}</View>
      <View>{renderBoleta()}</View>
      <View style={{ zIndex: 1 }}>
        {/* <View style={{zIndex: 1, position: 'absolute'}}>{renderModulos()}</View> */}
        {renderModulos()}
      </View>
    </View>
  );

  const renderPlan = () => {
    if (semestresQuery.isLoading) return <Text>CARGANDO PLAN..</Text>;
    if (semestresQuery.isError) return <Text>HUBO UN ERROR..</Text>;

    return (
      <>
        <FlatList
          data={null}
          ref={flatListRef}
          ListHeaderComponent={
            <>
              <View style={{ zIndex: 1 }}>{renderHeaderBody()}</View>
              <FlatList
                data={semestresQuery.data}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                  <DetalleMateriasSemestre
                    semestre={item.item}
                    modulo={valueModulo || 0}
                    active={item.item.id === semestreOpen}
                    onChangeSemestre={onChangeSemestre}
                    scrollToTop={scrollToTop}
                  />
                )}
              />
            </>
          }
          renderItem={null}
        />
      </>
    );
  };

  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      {renderPlan()}
    </View>
  );
};

const ProtectedScreen = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { height } = Dimensions.get("window");

  const { valueCarrera } = useCarreraContext();
  const { boletaCreateMutation } = useBoleta({ carrera: valueCarrera || -1 });

  const toggleModal = () => setVisibleModal(!visibleModal);

  const onNewBoleta = async () => {
    await boletaCreateMutation.mutateAsync(valueCarrera || -1);
  };

  return (
    <>
      {/* @ts-ignore */}

      <ProjectionsScreen />

      <CustomModal isVisible={visibleModal} >
        <View className="rounded-lg bg-white p-4 dark:bg-primario-dark">
          <Texto weight="Bold" className="mb-3 text-center text-xl text-black">
            DETALLES PARA CREACION DE BOLETA
          </Texto>

          <View className="mb-3 flex-row justify-between">
            <Texto weight="Bold" className="text-black dark:text-white">
              Estudiante:
            </Texto>
            <Texto className="text-black dark:text-white">xxxxxxxxxxxx</Texto>
          </View>

          <View className="mb-3 flex-row justify-between">
            <Texto weight="Bold" className="text-black dark:text-white">
              Carrera:
            </Texto>
            <Texto className="text-black dark:text-white">xxxxxxxxxxxx</Texto>
          </View>

          <View>
            <Button
              onPress={toggleModal}
              classNameBtn="bg-primario p-2 rounded"
            >
              <Texto className="text-center">Generar Boleta</Texto>
            </Button>
          </View>
        </View>
      </CustomModal>

      <View className="absolute bottom-0 right-0">
        {/* <FloatingButton onNew={onNewBoleta} onPrint={() => { }} /> */}
      </View>
    </>
  );
};

export default ProjectionsScreen;
