import React from 'react';

const ButtonBack = ({ texto, onClick }) => {
  return (
    <button onClick={onClick} className=" bg-blue-text-button hover:bg-hover-color-button-back active:bg-click-color-button-back text-white font-bold py-2 px-4 rounded-xl w-32 text-xl border  border-blue-text-button h-12 shadow-sm shadow-purple-text">
      {texto}
    </button>
  );
}

export default ButtonBack;