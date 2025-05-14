import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../src/context/ThemeContext";

const HomeIcon = ({ size, filled }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"
        fill={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default HomeIcon;
