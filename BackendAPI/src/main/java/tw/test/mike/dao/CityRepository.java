package tw.test.mike.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.test.mike.bean.CityBean;

public interface CityRepository extends JpaRepository<CityBean, Integer> {

}

