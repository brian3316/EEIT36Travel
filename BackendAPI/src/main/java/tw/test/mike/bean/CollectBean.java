package tw.test.mike.bean;

import java.util.List;

import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "collect")
public class CollectBean {
	@Id
	@GeneratedValue(
			strategy = GenerationType.IDENTITY
	)
	@Column(name ="collectid" )
	Integer collectid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "collectmemberid ",
	referencedColumnName = "memberid ")
	@JsonIgnore
	MemberBean member;

	public Integer getCollectid() {
		return collectid;
	}

	public void setCollectid(Integer collectid) {
		this.collectid = collectid;
	}


	@ManyToOne(fetch = FetchType.EAGER)//EAGER
	@JsonIgnore
	@JoinColumn(name = "collectblogid ",
			referencedColumnName = "blogid ")
	BlogBean blog;

	public MemberBean getMember() {
		return member;
	}

	public void setMember(MemberBean member) {
		this.member = member;
	}

	public BlogBean getBlog() {
		return blog;
	}

	public void setBlog(BlogBean blog) {
		this.blog = blog;
	}

	@Override
	public String toString() {
		return "CollectBean{" +
				"collectid=" + collectid +
				'}';
	}
}
