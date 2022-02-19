package tw.test.mike.datajpa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tw.test.mike.bean.CollectBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.CollectService;
import tw.test.mike.service.MemberService;

@SpringBootTest
public class CollectTests {

    @Autowired
    private MemberService memberService;

    @Autowired
    private CollectService collectService;


    @Test
    public void testselectbyMembertoBlog(){
        System.out.println(collectService.selectBlog(memberService.selectCollect(3)));
    }

    @Test
    public void testdelete(){
        CollectBean collectBean = new CollectBean();
        collectBean.setCollectid(2);
        collectService.delete(collectBean);
    }

}
