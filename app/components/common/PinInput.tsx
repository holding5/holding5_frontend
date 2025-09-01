import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type PinInputProps = {
  length?: number;
  onComplete?: (code: string) => void;
  secure?: boolean;
};

export default function PinInput({
  length = 4,
  onComplete,
  secure = false,
}: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<Array<TextInput | null>>([]);

  const setChar = (index: number, char: string) => {
    const next = [...values];
    next[index] = char;
    setValues(next);

    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    const code = next.join("");
    if (code.length === length && !next.includes("")) {
      onComplete?.(code);
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === "Backspace") {
      if (values[index] === "" && index > 0) {
        refs.current[index - 1]?.focus();
        const next = [...values];
        next[index - 1] = "";
        setValues(next);
      }
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(r) => {
            refs.current[i] = r;
          }}
          value={values[i]}
          onChangeText={(t) => setChar(i, t.replace(/[^0-9]/g, "").slice(0, 1))}
          onKeyPress={(e) => handleKeyPress(i, e)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          style={styles.box}
          secureTextEntry={secure}
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  box: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: "#d3d3d3ff",
    borderRadius: 6,
    backgroundColor: "#fff",
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    padding: 0,
    includeFontPadding: false,
  },
});
