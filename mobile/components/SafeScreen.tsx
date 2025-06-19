import { COLORS } from "@/constants/colors";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props {
  children: React.ReactNode;
}
// safe area component
const SafeScreen = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: COLORS.background,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
