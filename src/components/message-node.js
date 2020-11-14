import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

const messageNodeStyle = {
    borderRadius: '7px',
    border: '2px solid #94c7de',
    background: '#ffffff',
    color: '#000000',
    padding: '0px 10px 10px 0px',
};

export default memo(({ data }) => {
    return (
        <div style={messageNodeStyle}>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div style ={ {fontSize: '7px', top: '-10', left: '-10'}}>
                <strong>{data.user.name}</strong>
                <strong>{data.user.time}</strong>
            </div>
            <hr style={{marginTop: '-2px', marginRight:'-10px', border:'0px'}}/>
            <div style={{fontSize: '12px',paddingLeft: '10px'}}>
                {data.label}
            </div>
            <Handle
                type="source"
                position="bottom"
                id="a"
                style={{ background: '#555' }}
            />
        </div>
    );
});