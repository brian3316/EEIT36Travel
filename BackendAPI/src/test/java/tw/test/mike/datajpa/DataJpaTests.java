package tw.test.mike.datajpa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.MemberService;
import tw.test.mike.service.BlogService;
import tw.test.mike.service.JourneyService;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootTest
public class DataJpaTests {
	@Autowired
	BlogService blogService;
	@Autowired
	MemberService memberService;
	@Autowired
	JourneyService journeyService;
	@Test
	public void selectTest() {
		MemberBean memberBean = new MemberBean();
		memberBean.setMemberid(1);
		System.out.println(memberService.selectbyId(memberBean).getJourney().get(0).getJourneydetail());
//		System.out.println(memberService.selectbyId(memberBean).getBlog());
//		System.out.println("-------------------------------");
//		System.out.println(blogService.selectByKeyword("bunny"));
//		System.out.println("-------------------------------");
//		System.out.println(journeyService.selectById(1));
//		System.out.println("-------------------------------");
//		System.out.println(memberService.selectbyId(memberBean));
		
		
	}
	@Test
	public void selectKeywordTest() {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		System.out.println(sdf.format(date));
	}
}
