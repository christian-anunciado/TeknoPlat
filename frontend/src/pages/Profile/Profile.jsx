import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Profile.module.scss';


import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { fontSize } from '@mui/system'




const Profile = () => {
  
  const [filter, setFilter] = useState("")

  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
}
    const Profile = async () => {

  let formField = new FormData()
 formField.append('filter',filter)
 
   
  }
    return(
<div>
            <Navbar />
  
            <div className={styles.row2}>
              <div className={styles.row2__item}>
                <div className={styles.col2}>
                  <div className={styles.row3}>
                    <div className={styles.row3__item}>
                    <img
                      className={styles.wrapper4}
                      src={require('./assets/Default.png')}
                      alt="alt text"
                    />
                    </div>
  
                    <div className={styles.col3}>
                      <h5 className={styles.highlights}>Profile Name</h5>
  
                      <div className={styles.box1}>
                        <div className={styles.group}>
                          <h5 className={styles.highlights1}>Name</h5>
                        </div>
                      </div>
  
                      <h5 className={styles.highlights2}>Email</h5>
  
                      <div className={styles.box11}>
                        <div className={styles.group}>
                          <h5 className={styles.highlights1}>Email</h5>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className={styles.row4}>
                    <h2 className={styles.medium_title2} >
                          <a  href='#/editProfile' style={{fontWeight: "bold",color: "Blue", textDecoration: "none"}}> Edit Profile </a></h2>
                    <div className={styles.row4__item}>
                      <SettingsOutlinedIcon className={styles.icon5}/></div>
                  </div>
                </div>
              </div>
              <div className={styles.row2__spacer} />
              <div className={styles.row2__item1}>
                <div className={styles.col}>
                  <div className={styles.row3}>
                    <h2 className={styles.medium_title1}>Pitch History</h2>
                    <div className={styles.row3__spacer} />
  
                    <div className={styles.col4}>
                      <div className={styles.col4__item}>
                  
                        <div className={styles.image6}>
                        <px-grid
                          track-style="flex-grow: 1;"
                          area-style=":before: [object Object];"
                          x="65.5fr 67px 54.5fr"
                          y="0px 46px 0px">
                       
                          <Link to="/login" onClick={logout}><LogoutOutlinedIcon/></Link>
                        </px-grid>
                              
                        </div>
                      </div>
                     
                    </div>
                  </div>
  
                  <div className={styles.group1}>
                    <div className={styles.group2}>
                      <div className={styles.rect2} />
  
                      <div className={styles.col5}>
                        <div className={styles.rect3} />
                      </div>
                    </div>
  
                    <div className={styles.col6}>
                      <div className={styles.row5}>
                        <div className={styles.row5__item}>
                          <SearchOutlinedIcon/>
                        </div>
                        <div className={styles.row5__item1}>
                          <div>
                               <h5 className={styles.highlights21}>
                            <input
                type="text"
                placeholder="Filter Search"
                name="searchfilter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} ></input></h5>
                          </div>
                        </div>
                      </div>
  
                      <div className={styles.col7}>
                        <h5 className={styles.highlights3}>Pitch Title</h5>
  
                        <div className={styles.box2}>
                          <div className={styles.group}>
                            <h5 className={styles.highlights11}>Details</h5>
                          </div>
                        </div>
                      </div>
  
                      <div className={styles.col8}>
                        <h5 className={styles.highlights3}>Pitch Title</h5>
  
                        <div className={styles.box2}>
                          <div className={styles.group}>
                            <h5 className={styles.highlights11}>Details</h5>
                          </div>
                        </div>
                      </div>
  
                      <div className={styles.col8}>
                        <h5 className={styles.highlights3}>Pitch Title</h5>
  
                        <div className={styles.box2}>
                          <div className={styles.group}>
                            <h5 className={styles.highlights11}>Details</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
 
    )
}

export default Profile
