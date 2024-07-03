import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

interface ISelectProps {
  label: string;
  data: {
    id: number | string;
    label: string;
    value: string | number | boolean;
  }[];
  value: string | number | boolean;
  required?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  onSelectText: (text: string | number | boolean) => void;
}

export const Select: React.FC<ISelectProps> = ({
  label,
  data,
  onSelectText,
  value,
  required,
  disabled,
  placeHolder = "Pilih",
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        rowGap: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          columnGap: 4,
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontFamily: "InterRegular",
            color: "grey",
            fontSize: 15,
            marginStart: 2,
          }}
        >
          {label}
        </Text>
        {required && (
          <Text
            style={{
              color: Colors.error,
            }}
          >
            *
          </Text>
        )}
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 11,
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onSelectText(itemValue)}
          placeholder={placeHolder}
          selectionColor={Colors.primary}
          style={{
            height: "auto",
            marginVertical: -5.5,
          }}
        >
          {!value ||
            (value as string).length < 1 ||
            ((value as number) < 1 && (
              <Picker.Item
                key={0}
                label={placeHolder}
                value={""}
                enabled={false}
                color="grey"
                fontFamily="InterRegular"
              ></Picker.Item>
            ))}
          {data.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.label}
              value={item.value}
              fontFamily="InterRegular"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};
