import { View, TextInput, TextInputProps, Text } from 'react-native';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { Texto } from '../ui';

interface Props extends TextInputProps {
  control: Control<any>;
  rules?: RegisterOptions;
  name: string;
  label: string;
}

export const TextField: React.FC<Props> = ({
  control,
  rules,
  name,
  label,
  ...props
}) => {
  return (
    <View className="mb-3">
      <Texto className="mb-1 ml-4 text-black dark:text-white">{label}</Texto>
      <Controller
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextInput
              {...props}
              {...field}
              className={`rounded-2xl border bg-gray-100 p-4 text-gray-700 dark:bg-primario-dark dark:text-white ${error
                ? 'border-red-300'
                : 'border-gray-100 dark:border-[#0e285b]'
                }`}
              onChangeText={field.onChange}
            />
            {error && <Text className="text-red-400">{error?.message}</Text>}
          </>
        )}
        name={name}
      />
    </View>
  );
};

export default TextField;
