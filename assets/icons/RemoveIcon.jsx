import { useTheme } from "../../src/context/ThemeContext";
import Svg, { Path } from "react-native-svg";

const RemoveIcon = ({ size }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path d="M200-440v-80h560v80H200Z" fill={theme["selected-icons"]} />
    </Svg>
  );
};

export default RemoveIcon;
