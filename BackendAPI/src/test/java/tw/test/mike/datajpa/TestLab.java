package tw.test.mike.datajpa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.MemberService;
import tw.test.mike.tools.Tools;


@SpringBootTest
public class TestLab {

    @Autowired
    private MemberService memberService;

    @Test
    public void testage(){
        MemberBean bean = new MemberBean();
        bean.setMemberid(1);
        bean = memberService.selectbyId(bean);
        Integer age = Tools.age(bean);

        System.out.println(Tools.agerange(age).get("range"));
    }
}
