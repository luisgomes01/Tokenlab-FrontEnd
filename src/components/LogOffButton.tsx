import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom'

const LogOffButton: React.FC = () => {

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="dropdown">
      <IconButton 
        className="dropdown-toggle" 
        type="button" 
        id="dropDownUser" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false">
          <Avatar>
              <Icon>person</Icon>
          </Avatar>
      </IconButton>
      <div className="dropdown-menu" aria-labelledby="dropDownUser">
          <Link className="dropdown-item" to="/" onClick={handleSignOut}>Sair</Link>
      </div>
    </div>
  )
}

export default LogOffButton; 