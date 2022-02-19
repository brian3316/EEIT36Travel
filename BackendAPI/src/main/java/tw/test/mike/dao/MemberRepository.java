package tw.test.mike.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.test.mike.bean.CityBean;
import tw.test.mike.bean.MemberBean;

import java.util.ArrayList;
import java.util.List;


public interface MemberRepository
		extends JpaRepository<MemberBean, Integer> {

	public List<MemberBean> findBymembergender(Integer gender);

    public Integer countByCity(CityBean cityBean);

	public List<MemberBean> findByCity(CityBean cityBean);

	public MemberBean findBymemberemail(String email);

	public Integer countByMembergender(Integer gender);

	public Integer countAllBy();

	public List<MemberBean> findByOrderByMemberregistertimeAsc();

}

