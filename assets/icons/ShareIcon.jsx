import Svg, { Path } from "react-native-svg";

import { useTheme } from "../../src/context/ThemeContext";

const ShareIcon = ({ size }) => {
  const { theme } = useTheme();

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"
        fill={theme["selected-icons"]}
      />
    </Svg>
  );
};

export default ShareIcon;
