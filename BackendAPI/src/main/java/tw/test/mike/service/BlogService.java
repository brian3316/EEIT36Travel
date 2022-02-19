package tw.test.mike.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tw.test.mike.bean.BlogBean;
import tw.test.mike.bean.JourneyBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.dao.BlogRepository;

@Service
@Transactional
public class BlogService {
	@Autowired
	private BlogRepository blogRepository;

	public List<BlogBean> selectAll(){
		return blogRepository.findAll();
	}

	public BlogBean selectbyid(Integer blogid){
		BlogBean result = null;
		Optional<BlogBean> optional = blogRepository.findById(blogid);
		if(optional.isPresent()){
			updatepopular(optional.get());
			result = optional.get();
			return result;
		}
		return result;

	}

	public List<BlogBean> selectAllbyauthority(Integer authority){

		return blogRepository.findByblogauthority(authority);
	}

	public List<BlogBean> selectAllbymemberidandauthority(MemberBean memberBean){
		List<BlogBean> result = null;

		result = blogRepository.findByMemberAndBlogauthority(memberBean, 1);

		return result;
	}

	public List<BlogBean> selectAllOrderBypopular(){
		return blogRepository.findAllByOrderByBlogpopularDesc();
	}

	
	public List<BlogBean> selectByKeyword(String keyword) {
		return blogRepository.findByBlogdetailLike("%"+keyword+"%");

	}

	public JourneyBean selectJourney(BlogBean blogBean){
		if(blogBean!=null){
			return this.selectbyid(blogBean.getBlogid()).getJourney();
		}
		return null;
	}

	public MemberBean selectMember(BlogBean blogBean){
		if(blogBean!=null){
			return this.selectbyid(blogBean.getBlogid()).getMember();
		}
		return null;
	}

	public List<BlogBean> selecttoppopularblog(){
		return blogRepository.findTop9ByOrderByBlogpopularDesc();
	}

	public List<BlogBean> selecttop5newblog(){
		return blogRepository.findTop5ByOrderByBlogcreatetimeDesc();
	}



	public boolean delete(BlogBean blogBean) {
		Optional<BlogBean> optional =blogRepository.findById(blogBean.getBlogid());
		if(optional.isPresent()) {
			blogRepository.delete(blogBean);
			return true;
		}
		return false;
	}
	public BlogBean update(BlogBean blogBean) {
		Optional<BlogBean> optional =blogRepository.findById(blogBean.getBlogid());
		if(optional.isPresent()) {
			Date date = new Date();
			blogBean.setBlogupdatetime(date);
			return blogRepository.save(blogBean);
		}
		return null;
	}

	public BlogBean updatepopular(BlogBean blogBean){
		Optional<BlogBean> optional = blogRepository.findById(blogBean.getBlogid());
		if(optional.isPresent()){
			Integer popular = blogBean.getBlogpopular();
			popular++;
			blogBean.setBlogpopular(popular);
			return blogRepository.save(blogBean);
		}
		return null;
	}

	public BlogBean create(BlogBean blogBean) {
		Optional<BlogBean> optional =blogRepository.findById(blogBean.getBlogid());

		if(!optional.isPresent()) {
			Date date = new Date();
			blogBean.setBlogcreatetime(date);
			blogBean.setBlogpopular(0);
			return blogRepository.save(blogBean);
		}
		return null;
	}
}
