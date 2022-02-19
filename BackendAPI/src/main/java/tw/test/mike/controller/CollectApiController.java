package tw.test.mike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.test.mike.bean.BlogBean;
import tw.test.mike.bean.CollectBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.service.CollectService;
import tw.test.mike.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/collect")
@CrossOrigin
public class CollectApiController {

    @Autowired
    private CollectService collectService;

    @Autowired
    private MemberService memberService;

    @GetMapping({"/memberid={memberid}"})
    public ResponseEntity<?> selectblog(
            @PathVariable(name = "memberid") Integer memberid){
        List<BlogBean> result = collectService.selectBlog(memberService.selectCollect(memberid));

        if(result!=null){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping({"status/memberid={memberid}&blogid={blogid}"})
    public ResponseEntity<?> collectStatus(
            @PathVariable(name = "memberid") Integer memberid
            ,@PathVariable(name = "blogid") Integer blogid){
        Object[] result = collectService.existCollect(memberService.selectCollect(memberid),blogid);

            return ResponseEntity.ok(result);

        
    }


    @PostMapping({"/memberid={memberid}&blogid={blogid}"})
    public ResponseEntity<?> create(
        @PathVariable(name = "memberid") Integer memberid,
        @PathVariable(name = "blogid") Integer blogid){
        CollectBean bean = new CollectBean();

        MemberBean memberBean = new MemberBean();
        memberBean.setMemberid(memberid);
        bean.setMember(memberBean);

        BlogBean blogBean = new BlogBean();
        blogBean.setBlogid(blogid);
        bean.setBlog(blogBean);

        bean.setCollectid(65534);

        CollectBean result = collectService.create(bean);
        if(result!=null){
            try{
                return ResponseEntity.ok(result);
            }catch (Exception e){
                System.out.println(e);
            }

        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(
            @PathVariable(name = "id" , required = false)Integer id){
        CollectBean bean = new CollectBean();
        bean.setCollectid(id);
        boolean result = collectService.delete(bean);
        if(result){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
