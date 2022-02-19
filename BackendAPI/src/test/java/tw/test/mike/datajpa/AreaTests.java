package tw.test.mike.datajpa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tw.test.mike.bean.CityBean;
import tw.test.mike.service.AreaSerivce;

@SpringBootTest
public class AreaTests {

    @Autowired
    AreaSerivce areaSerivce;

    @Test
    public void testselectbycity(){
        CityBean cityBean = new CityBean();
        cityBean.setCityid(5);
        System.out.println(areaSerivce.selectbycityid(cityBean));
    }


}
