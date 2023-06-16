import React, {Component} from "react";
import profile from "../../assets/user.svg";

const Profile = () => {
  return (
  <div style={{color: "var(--text-dark)", background: "var(--bg-light)", margin: 30}}>
    <div style={{display:"flex", flexDirection:"row", gap: "1rem", alignItems: "center"}}>
      <img src={profile} alt="profile photo" style={{ width: 175, height: 175}} />
      <div>
        <h3 style={{fontSize: 40, fontWeight:600}}> Hatim Sawai </h3>
        <h6 style={{fontSize: 26, fontWeight:400}}> 2021300108 </h6>
      </div>
    </div>
    <div style={{paddingBottom: "1.5rem", borderBottom: "1px solid #1a1a1a"}}>
      <h3 style={{marginTop: 40, marginBottom: 10, fontWeight: 600, fontSize: 24}}>Personal Information</h3>
      <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
        <div style={{width:"50%"}}><i class="fas fa-phone"></i><span style={{marginLeft: 10}}>97690 95698</span> </div>
        <div style={{width:"50%"}}><i class="fa-solid fa-envelope"></i><span style={{marginLeft: 10}}>hatim.sawai@spit.ac.in</span></div>
      </div>
      <div style={{fontSize: 18}}><i class="fa-solid fa-location-dot"></i><span style={{marginLeft: 10}}>26/A, Shanti Niketan C.H.S., Gulmohar Road, Lower Parel - 28.</span></div>
    </div>
    <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10, marginTop: 30}}>
      <div style={{width:"50%"}}><i class="fa-solid fa-calendar-days"></i><span style={{marginLeft: 10}}>28/01/2003</span></div>
      <div style={{width:"50%"}}><i class="fa-solid fa-venus-mars"></i><span style={{marginLeft: 10}}>Male</span></div>
    </div>
    <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
      <div style={{width:"50%"}}><i class="fa-solid fa-droplet"></i><span style={{marginLeft: 10}}>B+</span> </div>
      <div style={{width:"50%"}}><i class="fa-solid fa-hands-praying"></i><span style={{marginLeft: 10}}>Islam</span></div>
    </div>
    <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
      <div style={{width:"50%"}}><i class="fa-brands fa-linkedin"></i><span style={{marginLeft: 10}}>hatim.sawai@spit.ac.in</span> </div>
      <div style={{width:"50%"}}><i class="fa-brands fa-github"></i><span style={{marginLeft: 10}}>Hitstar53</span></div>
    </div>
    <h3 style={{marginTop: 40, marginBottom: 10, fontWeight: 600, fontSize: 24}}>Parental Information</h3>
    <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
      <div style={{width:"50%"}}><i class="fa-solid fa-user"></i><span style={{marginLeft: 10}}>Yusuf Sawai</span></div>
      <div style={{width:"50%"}}><i class="fa-solid fa-user"></i><span style={{marginLeft: 10}}>Farida Sawai</span></div>
    </div>
    <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
      <div style={{width:"50%"}}><i class="fas fa-phone"></i><span style={{marginLeft: 10}}>+91 98677 43780</span></div>
      <div style={{width:"50%"}}><i class="fas fa-phone"></i><span style={{marginLeft: 10}}>+91 70455 88515</span></div>
    </div>
    <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
      <div style={{width:"50%"}}><i class="fa-solid fa-envelope"></i><span style={{marginLeft: 10}}>yusuf.sawai@gmail.com</span></div>
      <div style={{width:"50%"}}><i class="fa-solid fa-envelope"></i><span style={{marginLeft: 10}}>farida.sawai@gmail.com</span></div>
    </div>
    <h3 style={{marginTop: 40, marginBottom: 10, fontWeight: 600, fontSize: 24}}>Educational Information</h3>
    <div>
        <h3 style={{marginTop: 30, marginBottom: 10, fontWeight: 600, fontSize: 24}}>Current Degree</h3>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row"}}>
          <label style={{width:"50%", opacity: 0.7}}>Institute Name:</label>
          <label style={{width:"50%", opacity: 0.7}}>Degree:</label>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
          <div style={{width:"50%"}}>Sardar Patel Institute of Technology</div>
          <div style={{width:"50%"}}>Bachelors in Technology</div>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", justifyContent: "flex start", width: "100%"}}>
          <div><label style={{width:"50%", opacity: 0.7}}>Branch:</label>Computer Science</div>
          <div><label style={{width:"50%", opacity: 0.7, gap: "1rem"}}>Division:</label>B</div>
          <div><label style={{width:"50%", opacity: 0.7}}>Semester:</label>Three</div>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", justifyContent: "flex start"}}>
          <div><label style={{width:"50%", opacity: 0.7}}>Admission Year:</label>2021</div>
          <div><label style={{width:"50%", opacity: 0.7}}>Passing Year:</label>2025</div>
          <div><label style={{width:"50%", opacity: 0.7}}>CGPA:</label>9.1</div>
        </div>
      </div>
      <div>
        <h3 style={{marginTop: 30, marginBottom: 10, fontWeight: 600, fontSize: 24}}>Junior College</h3>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row"}}>
          <label style={{width:"50%", opacity: 0.7}}>Institute Name:</label>
          <label style={{width:"50%", opacity: 0.7}}>Qualification:</label>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}> 
          <div style={{width:"50%"}}>Nirmala Memorial Foundation and Juinor College</div>
          <div style={{width:"50%"}}>Higher Secondary Certificate</div>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
          <div style={{fontSize: 18, display: "flex", flexDirection: "row", justifyContent: "flex start"}}>
          <div><label style={{width:"50%", opacity: 0.7}}>Admission Year:</label>2019</div>
          <div><label style={{width:"50%", opacity: 0.7}}>Passing Year:</label>2021</div>
          <div><label style={{width:"50%", opacity: 0.7}}>Score:</label>94.8%</div>
        </div>
      </div>
      <div>
        <h3 style={{marginTop: 30, marginBottom: 10, fontWeight: 600, fontSize: 24}}>School Education</h3>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row"}}>
          <label style={{width:"50%", opacity: 0.7}}>Institute Name:</label>
          <label style={{width:"50%", opacity: 0.7}}>Qualification:</label>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
          <div style={{width:"50%"}}>Swami Vivekanand International School</div>
          <div style={{width:"50%"}}>Secondary School Certificate</div>
        </div>
        <div style={{fontSize: 18, display: "flex", flexDirection: "row", marginBottom: 10}}>
          <div style={{fontSize: 18, display: "flex", flexDirection: "row", justifyContent: "flex start"}}>
            <div><label style={{width:"50%", opacity: 0.7}}>Passing Year:</label>2019</div>
            <div><label style={{width:"50%", opacity: 0.7}}>Score:</label>95.6%</div>
          </div>
        </div>
      </div>
      {/* <a class="Back" onclick="plusSlides(-1)">&#10094;</a>
      <a class="forward" onclick="plusSlides(1)">&#10095;</a> */}
    </div>
    <br/>
    {/* <div style="text-align:center">
      <span class="dots" onclick="currentSlide(1)"></span>
      <span class="dots" onclick="currentSlide(2)"></span>
      <span class="dots" onclick="currentSlide(3)"></span>
    </div>  */}
  </div>
  )
}

export default Profile