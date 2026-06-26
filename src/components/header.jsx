import {Link} from 'react-router-dom';

function Header(){
    return(
        <div className="header">
            <div className="contents">
                <div className="logo">
                    <Link to="/">AccelHack</Link>
                </div>
                <div className="buttons">
                    <Link to="/">Top</Link>
                    <Link to="/todo">ToDo</Link>
                    <Link to="/calculate">Calculate</Link>
                </div>
            </div>
        </div> 
    )
}

export default Header;