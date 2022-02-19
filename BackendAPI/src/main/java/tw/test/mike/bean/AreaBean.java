package tw.test.mike.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

import javax.persistence.*;


@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "area")
public class AreaBean {

	@Id
	@GeneratedValue(
			strategy = GenerationType.IDENTITY
	)
	@Column(name = "areaid")
	private Integer areaid;

	@Column(name = "areaname")
	private String areaname;
	@JsonIgnore
	@OneToMany(
			mappedBy = "area",//對方classs內設定association的java屬性名稱
			cascade = {CascadeType.ALL},
			fetch = FetchType.LAZY

	)
	private List<CityBean> city;

	public List<CityBean> getCity() {
		return city;
	}

	public void setCity(List<CityBean> city) {
		this.city = city;
	}

	public Integer getAreaid() {
		return areaid;
	}

	public void setAreaid(Integer areaid) {
		this.areaid = areaid;
	}

	public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

	@Override
	public String toString() {
		return "AreaBean{" +
				"areaid=" + areaid +
				", areaname='" + areaname + '\'' +
				'}';
	}
}
