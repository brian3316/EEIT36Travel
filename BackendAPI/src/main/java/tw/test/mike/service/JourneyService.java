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
import tw.test.mike.dao.JourneyRepository;

@Service
@Transactional
public class JourneyService {
	@Autowired
	private JourneyRepository journeyRepository;

	public List<JourneyBean> selectAll(){
		return journeyRepository.findAll();
	}

	public JourneyBean selectbyId(JourneyBean journeyBean){
		JourneyBean result = null;
		Optional<JourneyBean> optional =journeyRepository.findById(journeyBean.getJourneyid());

		if(optional.isPresent()) {
			result = optional.get();

			return result;
		}
		return result;
	}

	public MemberBean selectMember(JourneyBean journeyBean){
		if(journeyBean!=null){
			return  this.selectbyId(journeyBean).getMember();
		}
		return null;
	}

	public List<BlogBean> selectBlog(JourneyBean journeyBean){
		List<BlogBean> result = null;
		if(journeyBean!=null){
			result = selectbyId(journeyBean).getBlog();
			return result;
		}
		return result;
	}

	public boolean delete(JourneyBean journeyBean) {
		Optional<JourneyBean> optional =journeyRepository.findById(journeyBean.getJourneyid());
		if(optional.isPresent()) {
			journeyRepository.deleteById(journeyBean.getJourneyid());
			return true;
		}
		return false;
	}
	public JourneyBean update(JourneyBean journeyBean) {
		Optional<JourneyBean> optional =journeyRepository.findById(journeyBean.getJourneyid());
		if(optional.isPresent()) {
			Date date = new Date();
			journeyBean.setJourneyupdatetime(date);

			return journeyRepository.save(journeyBean);
		}
		return null;
	}
	public JourneyBean create(JourneyBean journeyBean) {
		Optional<JourneyBean> optional =journeyRepository.findById(journeyBean.getJourneyid());
		if(!optional.isPresent()) {
			Date date = new Date();
			journeyBean.setJourneycreatetime(date);

			return journeyRepository.save(journeyBean);
		}
		return null;
	}
}
