import React from 'react';

const Timer = ({ hour, min, sec, borderColor, textColor }) => {

    return (
        <div className="flex justify-center item gap-4 mb-12">
            <div className="text-center">
                <p className={`px-10 py-3 text-4xl border border-${borderColor} rounded-xl`}>{hour}</p>
                <p className={`text-lg pt-2 text-${textColor}`}>Hora</p>
            </div>
            <div className="text-center">
                <p className={`px-10 py-3 text-4xl border border-${borderColor} rounded-xl`}>{min}</p>
                <p className={`text-lg pt-2 text-${textColor}`}>Minutos</p>
            </div>
            <div className="text-center">
                <p className={`px-10 py-3 text-4xl border border-${borderColor} rounded-xl`}>{sec}</p>
                <p className={`text-lg pt-2 text-${textColor}`}>Segundos</p>
            </div>
        </div>
    );
}

export default Timer;