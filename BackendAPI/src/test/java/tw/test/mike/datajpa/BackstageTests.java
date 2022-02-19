package tw.test.mike.datajpa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tw.test.mike.service.BackstageService;

@SpringBootTest
public class BackstageTests {

    @Autowired
    private BackstageService backstageService;

    @Test
    public void testselectcountbyarea(){
        System.out.println(backstageService.selectcountbyarea());
    }

    @Test
    public void testallmemberagedata(){
        backstageService.allmemberagedata();
    }


    @Test
    public void testmembergenderdata(){
        System.out.println(backstageService.membergenderdata());
    }

    @Test
    public void testregistertimedata(){
        backstageService.registertimedata();
    }

}
