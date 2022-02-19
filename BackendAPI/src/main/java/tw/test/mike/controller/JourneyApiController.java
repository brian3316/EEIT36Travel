package tw.test.mike.controller;

import java.security.PrivateKey;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.ReactivePageableHandlerMethodArgumentResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import tw.test.mike.bean.JourneyBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.JourneyService;
import tw.test.mike.service.MemberService;

@RestController
@RequestMapping("/journey")
@CrossOrigin
public class JourneyApiController {
	@Autowired
	private JourneyService journeyService;

	@Autowired
	private MemberService memberService;
	
	@GetMapping({"/"})
	public ResponseEntity<?> read(){	
		try {
			List<JourneyBean> resault = journeyService.selectAll();
			if(resault!=null) {
				return ResponseEntity.ok(resault);
			}
			return ResponseEntity.notFound().build();
		}catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(500).build();
		}

	}
	@GetMapping("/{id}")
	public ResponseEntity<?> selectbyId(
			@PathVariable(name = "id", required = false) Integer id){
		JourneyBean bean = new JourneyBean();
		bean.setJourneyid(id);
		JourneyBean result = journeyService.selectbyId(bean);
		if(result!=null){
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping({"/memberid={memberid}"})
	public ResponseEntity<?> selectbyMemberId(
			@PathVariable(name = "memberid") Integer memberid){
		List<JourneyBean> result = memberService.selectJourney(memberid);

		if(result!=null){
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.notFound().build();
	}


	@PostMapping({"/memberid={memberid}",})
	public ResponseEntity<?> create(@RequestBody JourneyBean bean,
			@PathVariable(name = "memberid", required = false) Integer memberid){

		MemberBean member = new MemberBean();
		member.setMemberid(memberid);
		bean.setMember(memberService.selectbyId(member));

		bean.setJourneyid(65534);
		JourneyBean result = journeyService.create(bean);
		System.out.println(result);
		if(result!=null) {
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.badRequest().build();
	}

	@PutMapping({"/"})
	public ResponseEntity<?> update(@RequestBody JourneyBean bean){
		bean.setMember(journeyService.selectMember(bean));

		JourneyBean result = journeyService.update(bean);
		if(result!=null) {
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.badRequest().build();
	}
	
	@DeleteMapping({"/{id}"})
	public ResponseEntity<?> delete(
			@PathVariable(name = "id",required = false) Integer id){
		JourneyBean bean = new JourneyBean();
		bean.setJourneyid(id);
		boolean result = journeyService.delete(bean);
		if(result) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
