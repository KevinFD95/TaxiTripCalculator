import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../src/context/ThemeContext.jsx";

const LightModeIcon = ({ size, focused }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"
        fill={focused ? theme["selected-icons"] : theme["unselected-icons"]}
        stroke={focused ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default LightModeIcon;
