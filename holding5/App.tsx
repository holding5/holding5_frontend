import { NativeBaseProvider, Box, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="lg" color="primary.500">
          Hello, NativeBase!r
        </Text>
      </Box>
    </NativeBaseProvider>
  );
}
