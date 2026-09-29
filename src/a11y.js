// Keyboard and screen-reader support for elements styled as cards rather than buttons.
export const clickable = (onClick) => ({
  role: "button",
  tabIndex: 0,
  onClick,
  onKeyDown: (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(e);
    }
  },
});
