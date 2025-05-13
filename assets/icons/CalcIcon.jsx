import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";
import Svg, { Path } from "react-native-svg";

const CalcIcon = ({ size, filled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60ZM250-592h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm364-402 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Z"
        fill={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        stroke={filled ? theme["selected-icons"] : theme["unselected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default CalcIcon;
