package tw.test.mike.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tw.test.mike.bean.BlogBean;
import tw.test.mike.bean.CollectBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.dao.CollectRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CollectService {

    @Autowired
    private CollectRepository collectRepository;

    public List<BlogBean> selectBlog(List<CollectBean> beans){
        List<BlogBean> blogBeans = new ArrayList<>();

        if(beans!=null){
            for(CollectBean collectBean : beans){
                Optional<CollectBean> optional = collectRepository.findById(collectBean.getCollectid());
                if(optional.isPresent()){
                    blogBeans.add(optional.get().getBlog());
                }
            }
            return blogBeans;
        }
        return blogBeans;
    }

    public CollectBean create(CollectBean collectBean){
        Optional<CollectBean> optional = collectRepository.findById(collectBean.getCollectid());

        if(!optional.isPresent()){
            return collectRepository.save(collectBean);
        }
        return null;
    }
    
    public Object[] existCollect(List<CollectBean> beans,Integer blogid) {
    	Object[] result = {false,null};
    	if(beans!=null&&blogid!=null) {
        	for(CollectBean bean:beans) {
        		if(bean.getBlog().getBlogid()==blogid) {
        			result[0]=true;
        			result[1]=bean.getCollectid();
        			return result;   			
        		}
        	}
    	}
    	return result;
    	
    }
    
    public boolean delete(CollectBean collectBean){
        Optional<CollectBean> optional = collectRepository.findById(collectBean.getCollectid());
        if(optional.isPresent()){
            collectRepository.delete(collectBean);
            return true;
        }
        return false;
    }

}
