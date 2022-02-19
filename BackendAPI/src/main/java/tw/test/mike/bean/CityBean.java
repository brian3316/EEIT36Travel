package tw.test.mike.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.util.List;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "city")
public class CityBean {
	@Id
	@GeneratedValue(
			strategy = GenerationType.IDENTITY
	)
	@Column(name = "cityid")
	private Integer cityid;
	@Column(name = "cityname")
	private String cityname;


	@ManyToOne(
			fetch = FetchType.LAZY,
			cascade = {CascadeType.ALL}
	)
	@JsonIgnore
	@JoinColumn(
			name = "cityareaid",//對照自己table內association欄位
			referencedColumnName = "areaid"//對照參照對象association欄位
	)
	private AreaBean area;


	public AreaBean getArea() {
		return area;
	}

	public void setArea(AreaBean area) {
		this.area = area;
	}

	public Integer getCityid() {
		return cityid;
	}

	public void setCityid(Integer cityid) {
		this.cityid = cityid;
	}

	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}



	@Override
	public String toString() {
		return "CityBean{" +
				"cityid=" + cityid +
				", cityname='" + cityname + '\'' +
				'}';
	}
}
