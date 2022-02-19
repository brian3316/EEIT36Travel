package tw.test.mike.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.test.mike.bean.AreaBean;
import tw.test.mike.bean.CityBean;

public interface AreaRepository extends JpaRepository<AreaBean, Integer> {

    public AreaBean findByCity(CityBean cityBean);
}
