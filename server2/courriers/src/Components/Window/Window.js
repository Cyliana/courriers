import React,{useState} from 'react';
import './Window.css';
import '../../fonts/Marlett.css';

const Window = (props) =>
{
    let x = parseInt(props.x);
    let y = parseInt(props.y);
    let w = parseInt(props.w);
    let h = parseInt(props.h);

    const [opened, setOpened] = useState(true)
    ;
    const [winState,setWinState] = useState("restored");
    const [winButtonIcon,setWinButtonIcon] = useState("1");
    const [winXYWH,setWinXYWH] = useState({
        left: props.x,
        top: props.y,
        width: props.w,
        height: props.h
    });

    let isMoving = false;
    let omouseX;
    let omouseY;

    const switchWinState = (e) =>
    {
        console.log("switchWinState()");
        e.preventDefault();

        if(winState == 'minimized' || winState == 'maximized')
        {
            setWinState("restored");
            setWinButtonIcon("1");
            setWinXYWH({
                left: x,
                top: y,
                width: w,
                height: h
            });
        }
        else if(winState == 'restored')
        {
            setWinState("maximized");
            setWinButtonIcon("2");
            setWinXYWH({
                left:"0px",
                right:"0px",
                top:"0px",
                bottom:"0px"
            });
        }
        console.log(winState);
    }

    const onMouseDown = (e) =>
    {
        console.log("onMouseDown()");
        isMoving = true;
        omouseX = e.clientX;
        omouseY = e.clientY;
        move(e);
        document.onmousemove = move;
        document.onmouseup = onMouseUp;
    }

    const onMouseUp = (e) =>
    {
        console.log("onMouseUp()");
        isMoving = false;
        document.onmousemove = null;
        document.onmouseup = null;
        setWinXYWH({
            left: x,
            top: y,
            width: w,
            height: h
        });
    }

    function move(e)
    {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        let mouseOffsetX = mouseX - omouseX;
        let mouseOffsetY = mouseY - omouseY;

        x = (parseInt(x) + mouseOffsetX) + 'px';
        y = (parseInt(y) + mouseOffsetY) + 'px';

        console.log(mouseX + '->' + x + ' / ' + mouseY + '->' + y)

        setWinXYWH({
            left: x,
            top: y,
            width: w,
            height: h
        });

        // document.getElementById(props.id).style.left = x;
        // document.getElementById(props.id).style.top = y;

        omouseX = mouseX;
        omouseY = mouseY;
    }

    const close = (e) =>
    {
        e.preventDefault();
        setOpened(false);
    }

    return (
        <>
            {opened && (
                <div className="window" id={props.id} style={winXYWH}>
                    <div className="titleBar" >
                        <div className="title" onMouseDown={onMouseDown}>{props.title}</div>
                        <div className="minimize">0</div>
                        <div className="maximize" onClick={switchWinState}>{winButtonIcon}</div>
                        <div className="close" onClick={close}>r</div>
                    </div>
                    <div className="main">{props.main}</div>
                    <div className="status">{props.status}</div>
                </div>
            )}
        </>
    );
}

export default Window;

