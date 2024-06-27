import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface IInputProps {
    label: string;
    value: string | number;
    type: string;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    onChangeText: (text: string | number) => void;
}

export const Input: React.FC<IInputProps> = ({
    label,
    value,
    type = "text",
    onChangeText,
    placeholder,
    required,
    errorMessage,
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
                        fontSize: 14,
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
            <TextInput
                value={String(value)}
                onChangeText={onChangeText}
                placeholder={placeholder || "Masukan " + label}
                keyboardType={type === "number" ? "numeric" : "default"}
                style={{
                    borderWidth: 1,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderColor: "grey",
                    borderRadius: 11,
                }}
            />
        </View>
    );
};
