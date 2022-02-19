package tw.test.mike.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tw.test.mike.bean.CityBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.dao.CityRepository;
import tw.test.mike.dao.MemberRepository;

import java.util.Optional;


@Service
@Transactional
public class CityService {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private MemberRepository memberRepository;

    public CityBean selectbyid(CityBean cityBean){
        CityBean result = null;
        Optional<CityBean> optional = cityRepository.findById(cityBean.getCityid());
        if(optional.isPresent()){
            result = optional.get();
        }
        return result;
    }

    public Integer selectbymemberid(Integer memberid){
        Optional<MemberBean> optional = memberRepository.findById(memberid);
        if(optional.isPresent()){
            try{
                Integer cityid = optional.get().getCity().getCityid();
                return cityid;
            }catch (NullPointerException e){

            }
        }
        return null;
    }

}
