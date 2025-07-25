import { useTheme } from "../../src/context/ThemeContext.jsx";
import Svg, { Path } from "react-native-svg";

const SettingsIcon = ({ size, filled }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"
        fill={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default SettingsIcon;
