package tw.test.mike.datajpa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tw.test.mike.bean.JourneyBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.JourneyService;
import tw.test.mike.service.MemberService;

@SpringBootTest
public class JourneyTests {
    @Autowired
    private JourneyService journeyService;

    @Autowired
    private MemberService memberService;

    @Test
    public void testSelects(){
        System.out.println(journeyService.selectAll());
    }

    @Test
    public void testSelectsbyId(){
        JourneyBean journeyBean = new JourneyBean();
        journeyBean.setJourneyid(1);

        System.out.println(journeyService.selectbyId(journeyBean));
    }

    @Test
    public void testSelectBlog(){
        JourneyBean journeyBean = new JourneyBean();
        journeyBean.setJourneyid(1);

        System.out.println(journeyService.selectBlog(journeyBean));
    }
    @Test
    public void testcreate(){
        JourneyBean journeyBean = new JourneyBean();
        journeyBean.setJourneyid(999);
        journeyBean.setJourneydetail("123456");

        MemberBean memberBean = new MemberBean();
        memberBean.setMemberid(1);

        journeyBean.setMember(memberService.selectbyId(memberBean));
        journeyService.create(journeyBean);
}

    @Test
    public void testdelete(){
        JourneyBean journeyBean = new JourneyBean();
        journeyBean.setJourneyid(19);

        journeyService.delete(journeyBean);
    }

}
