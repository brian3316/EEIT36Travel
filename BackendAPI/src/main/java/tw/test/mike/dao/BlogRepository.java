package tw.test.mike.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import tw.test.mike.bean.BlogBean;
import tw.test.mike.bean.MemberBean;

public interface BlogRepository extends 
			JpaRepository<BlogBean, Integer>{
	
	public List<BlogBean> findByBlogdetailLike(String name);
	//實現除了基本crud以外的資料庫互動

	public List<BlogBean> findByblogauthority(Integer authority);

	public List<BlogBean> findByMemberAndBlogauthority(MemberBean memberBean, Integer authority);

	public List<BlogBean> findAllByOrderByBlogpopularDesc();

	public List<BlogBean> findTop9ByOrderByBlogpopularDesc();

	public List<BlogBean> findTop5ByOrderByBlogcreatetimeDesc();

	@Query(value = "SELECT SUM(blogpopular) as memberpopular,blogmemberid from blog group by blogmemberid order by memberpopular desc LIMIT 10", nativeQuery = true)
	public List<Map> findpopularmember();
}
