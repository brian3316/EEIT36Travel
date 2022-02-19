package tw.test.mike.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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


import tw.test.mike.bean.BlogBean;
import tw.test.mike.bean.JourneyBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.BlogService;
import tw.test.mike.service.CollectService;
import tw.test.mike.service.MemberService;

@RestController
@RequestMapping("/blog")
@CrossOrigin
public class BlogApiController {
	@Autowired
	private BlogService blogService;

	@Autowired
	private MemberService memberService;

	@Autowired
	private CollectService collectService;

	@GetMapping("/")
	public ResponseEntity<?> selectAll(){
		List<BlogBean> result = blogService.selectAll();
		if(result!=null){
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping({"/{id}"})
	public ResponseEntity<?> selectbyid(
			@PathVariable(name = "id") Integer id){
		BlogBean temp = blogService.selectbyid(id);
		MemberBean member = memberService.selectbyId(temp.getMember());
		JSONObject result = new JSONObject();
		result.put("blogid", temp.getBlogid());
		result.put("blogdetail", temp.getBlogdetail());
		result.put("blogauthority", temp.getBlogauthority());
		result.put("blogcreatetime", temp.getBlogcreatetime());
		result.put("blogupdatetime", temp.getBlogupdatetime());
		result.put("blogpopular", temp.getBlogpopular());
		result.put("membernickname", member.getMembernickname());
		result.put("memberintro", member.getMemberintro());
		result.put("membericon", member.getMembericon());
		if(result!=null){
			return ResponseEntity.ok(result.toString());
		}else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping({"/authority{authority}"})
	public ResponseEntity<?> selectAllbyauthority(
			@PathVariable(name = "authority") Integer authority){
		List<BlogBean> result = blogService.selectAllbyauthority(authority);
		if(result!=null) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping({"/keyword={keyword}"})
	public ResponseEntity<?> selectbykeyword(
			@PathVariable(name = "keyword",required = false) String keyword){	
		System.out.println(keyword);
		try {
			List<BlogBean> resault = blogService.selectByKeyword(keyword);
			if(resault!=null) {
				return ResponseEntity.ok(resault);
			}
			return ResponseEntity.notFound().build();
		}catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(500).build();
		}

	}

	@GetMapping({"/topblog"})
	public ResponseEntity<?> selecttoppopularblog(){
		List<BlogBean> result = blogService.selecttoppopularblog();
		if(result!=null){
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping({"/memberid={memberid}"})
	public ResponseEntity<?> selectbymemberid(
			@PathVariable (name = "memberid",required = false) Integer memberid){
		List<BlogBean> result = memberService.selectBlog(memberid);

		if(result!=null){
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping({"/popular"})
	public ResponseEntity<?> selectbypopular(){
		List<BlogBean> result = blogService.selectAllOrderBypopular();
		if(result!=null){
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping({"/collect/{memberid}"})
	public ResponseEntity<?> selectbymembercollect(
			@PathVariable (name = "memberid")Integer memberid){
		List<BlogBean> result = collectService.selectBlog(memberService.selectCollect(memberid));
		if(result!=null){
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping({"/newblog"})
	public ResponseEntity<?> selectnewblog(){
		List<BlogBean> result = blogService.selecttop5newblog();
		if(result!=null){
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.notFound().build();
	}

	
	@PostMapping({"/member={memberid}&journey={journeyid}"})
	public ResponseEntity<?> create(@RequestBody BlogBean bean,
		@PathVariable(name = "memberid") Integer memberid,
		@PathVariable(name = "journeyid") Integer journeyid){

		MemberBean member = new MemberBean();
		member.setMemberid(memberid);
		bean.setMember(member);

		JourneyBean journey = new JourneyBean();
		journey.setJourneyid(journeyid);
		bean.setJourney(journey);
		bean.setBlogid(65534);

		BlogBean result = blogService.create(bean);
		if(result!=null) {
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.badRequest().build();
	}
	
	@DeleteMapping({"{id}"})
	public ResponseEntity<?> delete(
			@PathVariable(name = "id",required = false) Integer id){
		BlogBean bean = new BlogBean();
		bean.setBlogid(id);
		boolean result = blogService.delete(bean);
		if(result) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
	@PutMapping({"/"})
	public ResponseEntity<?> update(@RequestBody BlogBean bean){
		bean.setJourney(blogService.selectJourney(bean));
		bean.setMember(blogService.selectMember(bean));
		bean.setBlogcreatetime(blogService.selectbyid(bean.getBlogid()).getBlogcreatetime());

		BlogBean result = blogService.update(bean);
		if(result!=null) {
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.badRequest().build();
	}

}

