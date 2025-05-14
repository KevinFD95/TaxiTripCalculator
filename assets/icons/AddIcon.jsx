import { useTheme } from "../../src/context/ThemeContext";
import Svg, { Path } from "react-native-svg";

const AddIcon = ({ size }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
        fill={theme["selected-icons"]}
      />
    </Svg>
  );
};

export default AddIcon;
