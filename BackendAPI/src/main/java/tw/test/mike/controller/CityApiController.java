package tw.test.mike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.test.mike.service.CityService;

@RestController
@RequestMapping({"/city/"})
@CrossOrigin
public class CityApiController {
    @Autowired
    private CityService cityService;

    @GetMapping({"memberid={memberid}"})
    private ResponseEntity<?> selectbymemberid(
            @PathVariable(name = "memberid") Integer memberid){
        Integer result  = cityService.selectbymemberid(memberid);
        if(result!=null){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }
}
