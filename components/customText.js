export default (props) => (
  <Text {...props} style={[{ fontFamily: "roboto-regular" }, props.style]}>
    {props.children}
  </Text>
);
