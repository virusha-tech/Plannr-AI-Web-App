import styled from "styled-components";

function Button({ title, onClick, Icon, disabled, children }) {
  return (
    <StyledButton
      className={
        disabled
          ? `select-none py-1 px-4 border-t-2 border-gray-300 bg-gray-300 hover:bg-gray-400 disabled hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer transition`
          : `select-none py-1 px-4 border-t-2 border-gray-400 bg-gray-500 hover:bg-gray-600 hover:via-blue-700 hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer transition`
      }
      onClick={disabled ? null : onClick}
    >
      {Icon && (
        <Icon
          className={
            disabled
              ? `h-6 w-6 mr-2 text-gray-100`
              : "h-6 w-6 mr-2 text-gray-200"
          }
        />
      )}
      {title}
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: ${({ disabled, theme }) => {
    return !disabled ? theme.primary : "rgba(107,114,128)";
  }};
  height: 40px;
`;

export default Button;
