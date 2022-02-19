package tw.test.mike.bean;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "member")
public class MemberBean {
	@Id
	@Column(name = "memberid")
	@GeneratedValue(
			strategy = GenerationType.IDENTITY
	)
	private Integer memberid;

	@Column(name = "membername")
	private String membername;

	@Column(name = "memberemail")
	private String memberemail;

	@Column(name = "membericon")
	private String membericon;

	@Column(name = "membernickname")
	private String membernickname;

	@Column(name = "memberbirth")
	private Date memberbirth;

	@Column(name = "membergender")
	private Integer membergender;


	@Column(name = "memberintro")
	@Type(type = "text")
	private String memberintro;

	@Column(name = "memberregistertime")
	private Date memberregistertime;


	@ManyToOne(
			fetch= FetchType.LAZY,
			cascade = {CascadeType.ALL}
	)
	@JsonIgnore
	@JoinColumn(
			name = "membercityid ",
			referencedColumnName = "cityid"
	)
	private CityBean city;

	@OneToMany(
			mappedBy = "member",
			cascade = {CascadeType.ALL},
			fetch= FetchType.LAZY
	)
	@Fetch(FetchMode.SUBSELECT)
	@JsonIgnore
	private List<JourneyBean> journey;

	@OneToMany(
			mappedBy = "member",
			cascade = {CascadeType.ALL},
			fetch= FetchType.LAZY
	)
	@Fetch(FetchMode.SUBSELECT)
	@JsonIgnore
	private List<BlogBean> blog;

	@OneToMany(
			mappedBy = "member",
			cascade = {CascadeType.ALL},
			fetch = FetchType.EAGER
			)
	@Fetch(FetchMode.SUBSELECT) //限制fetch深度避免進入fetch recursive
	@JsonIgnore
	private List<CollectBean> collect;

	public Date getMemberregistertime() {
		return memberregistertime;
	}

	public void setMemberregistertime(Date memberregistertime) {
		this.memberregistertime = memberregistertime;
	}

	public CityBean getCity() {
		return city;
	}

	public void setCity(CityBean city) {
		this.city = city;
	}

	public List<JourneyBean> getJourney() {
		return journey;
	}

	public void setJourney(List<JourneyBean> journey) {
		this.journey = journey;
	}

	public List<BlogBean> getBlog() {
		return blog;
	}

	public void setBlog(List<BlogBean> blog) {
		this.blog = blog;
	}

	public Integer getMemberid() {
		return memberid;
	}

	public void setMemberid(Integer memberid) {
		this.memberid = memberid;
	}

	public String getMembericon() {
		return membericon;
	}

	public void setMembericon(String membericon) {
		this.membericon = membericon;
	}


	public String getMembername() {
		return membername;
	}

	public void setMembername(String membername) {
		this.membername = membername;
	}

	public String getMemberemail() {
		return memberemail;
	}

	public void setMemberemail(String memberemail) {
		this.memberemail = memberemail;
	}

	public String getMembernickname() {
		return membernickname;
	}

	public void setMembernickname(String membernickname) {
		this.membernickname = membernickname;
	}

	public Date getMemberbirth() {
		return memberbirth;
	}

	public void setMemberbirth(Date memberbirth) {
		this.memberbirth = memberbirth;
	}

	public Integer getMembergender() {
		return membergender;
	}

	public void setMembergender(Integer membergender) {
		this.membergender = membergender;
	}

	public String getMemberintro() {
		return memberintro;
	}

	public void setMemberintro(String memberintro) {
		this.memberintro = memberintro;
	}

	public List<CollectBean> getCollect() {
		return collect;
	}

	public void setCollect(List<CollectBean> collect) {
		this.collect = collect;
	}

	@Override
	public String toString() {
		return "MemberBean{" +
				"memberid=" + memberid +
				", membername='" + membername + '\'' +
				", memberemail='" + memberemail + '\'' +
				", membericon='" + membericon + '\'' +
				", membernickname='" + membernickname + '\'' +
				", memberbirth=" + memberbirth +
				", membergender=" + membergender +
				", memberintro='" + memberintro + '\'' +
				", memberregistertime=" + memberregistertime +
				'}'+"\n";
	}
}