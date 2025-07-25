import { useTheme } from "../../src/context/ThemeContext";
import Svg, { Path } from "react-native-svg";

const RadiobuttonIcon = ({ size, checked }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      {checked ? (
        <Path
          d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
          fill={theme["selected-icons"]}
          stroke={theme["selected-icons"]}
          strokeWidth={1}
        />
      ) : (
        <Path
          d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0 0q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Z"
          fill={theme["unselected-icons"]}
          stroke={theme["unselected-icons"]}
          strokeWidth={1}
        />
      )}
    </Svg>
  );
};

export default RadiobuttonIcon;
