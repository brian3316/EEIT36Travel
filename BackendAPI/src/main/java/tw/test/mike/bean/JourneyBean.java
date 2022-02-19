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
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "journey")
public class JourneyBean {

	@Id
	@Column(name = "journeyid")
	@GeneratedValue(
			strategy = GenerationType.IDENTITY
	)
	private Integer journeyid;

	@Column(name = "journeydetail")
	private String journeydetail;

	@Column(name = "journeycreatetime")
	private Date journeycreatetime;

	@Column(name = "journeyupdatetime")
	private Date journeyupdatetime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(
			name = "journeymemberid",
			referencedColumnName = "memberid"
	)
	private MemberBean member;


	@OneToMany(
			mappedBy = "journey",
			cascade = {CascadeType.ALL},
			fetch = FetchType.LAZY
	)
	@Fetch(FetchMode.SUBSELECT)
	@JsonIgnore
	private List<BlogBean> blog;



	public MemberBean getMember() {
		return member;
	}

	public void setMember(MemberBean member) {
		this.member = member;
	}

	public List<BlogBean> getBlog() {
		return blog;
	}

	public void setBlog(List<BlogBean> blog) {
		this.blog = blog;
	}

	public Integer getJourneyid() {
		return journeyid;
	}

	public void setJourneyid(Integer journeyid) {
		this.journeyid = journeyid;
	}

	public String getJourneydetail() {
		return journeydetail;
	}

	public void setJourneydetail(String journeydetail) {
		this.journeydetail = journeydetail;
	}

	public Date getJourneycreatetime() {
		return journeycreatetime;
	}

	public void setJourneycreatetime(Date journeycreatetime) {
		this.journeycreatetime = journeycreatetime;
	}

	public Date getJourneyupdatetime() {
		return journeyupdatetime;
	}

	public void setJourneyupdatetime(Date journeyupdatetime) {
		this.journeyupdatetime = journeyupdatetime;
	}

	@Override
	public String toString() {
		return "JourneyBean{" +
				"journeyid=" + journeyid +
				", journeydetail='" + journeydetail + '\'' +
				", journeycreatetime=" + journeycreatetime +
				", journeyupdatetime=" + journeyupdatetime +
				'}';
	}
}
