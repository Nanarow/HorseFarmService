import plugin from "tailwindcss/plugin";

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ".flex-center": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".abs-center": {
      "--tw-translate-x": "-50%",
      "--tw-translate-y": "-50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(var(--tw-translate-x), var(--tw-translate-y))",
    },
  });
});
