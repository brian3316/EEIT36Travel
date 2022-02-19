package tw.test.mike.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tw.test.mike.bean.AreaBean;
import tw.test.mike.bean.CityBean;
import tw.test.mike.bean.MemberBean;
import tw.test.mike.dao.AreaRepository;
import tw.test.mike.dao.BlogRepository;
import tw.test.mike.dao.CityRepository;
import tw.test.mike.dao.MemberRepository;
import tw.test.mike.tools.Tools;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;

@Service
@Transactional
public class BackstageService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private BlogRepository blogRepository;

    public JSONArray selectmembercountbycity(){
        JSONArray result = new JSONArray();

        CityBean cityBean = new CityBean();
        for(int i=1; i<=22; i++){
            JSONObject city = new JSONObject();
            cityBean.setCityid(i);
            Integer count = 0;
            String name = "";
            if(cityBean!=null){
                count = memberRepository.countByCity(cityBean);
                name = cityRepository.findById(i).get().getCityname();
                city.put("name",name);
                city.put("count",count);
            }
            result.put(city);
        }
        return result;
    }

    public JSONArray selectcountbyarea(){
        JSONArray result = new JSONArray();
        AreaBean areaBean = new AreaBean();
        for(int i=1;i<=5;i++){
            JSONObject area = new JSONObject();
            List<CityBean> citys;

            Integer count = 0;
            String name;

            areaBean.setAreaid(i);
            if(areaBean!=null){
                citys = areaRepository.findById(i).get().getCity();
                for(CityBean city : citys){
                    count += memberRepository.countByCity(city);
                }
                name=areaRepository.findById(i).get().getAreaname();
                area.put("name", name);
                area.put("count", count);
            }
            result.put(area);
        }
        return result;
    }

    public Integer countAllBy(){
        return memberRepository.countAllBy();
    }

    public JSONArray allmemberagedata(){
        JSONArray result = new JSONArray();

        for(int i=13;i<69;i=i+10){
            JSONObject data = new JSONObject(new LinkedHashMap<>());
            data.put("name",Tools.agerange(i).get("range").toString());
            data.put("male",0);
            data.put("female",0);
            data.put("total",0);
            result.put(data);
        }

        ArrayList<MemberBean> memberbeans = (ArrayList)memberRepository.findAll();
        for(int i=0;i<memberbeans.size();i++){
            Integer age = Tools.age(memberbeans.get(i));
            try{
                Integer agerangevalue = (Integer) Tools.agerange(age).get("value");
                JSONObject temp;
                temp = (JSONObject)result.get(agerangevalue);
                Integer tempfemale = temp.getInt("female");
                Integer tempmale = temp.getInt("male");
                Integer temptotal = temp.getInt("total");

                try{
                    ((JSONObject) result.get(agerangevalue)).put("total",temptotal+1);
                    if(memberbeans.get(i).getMembergender()==0){
                        ((JSONObject) result.get(agerangevalue)).put("female",tempfemale+1);
                    }
                    else {
                        ((JSONObject) result.get(agerangevalue)).put("male",tempmale+1);
                    }
                }catch (NullPointerException e){

                }
            }catch (JSONException e){
            }
        }
        return result;
    }

    public JSONArray membergenderdata(){
        JSONArray result = new JSONArray();
        JSONObject female = new JSONObject(new LinkedHashMap<>());
        JSONObject male = new JSONObject(new LinkedHashMap<>());

        Integer countfemale = memberRepository.countByMembergender(0);
        Integer countmale = memberRepository.countByMembergender(1);

        female.put("name", "female");
        female.put("count", countfemale);
        result.put(female);

        male.put("name", "male");
        male.put("count", countmale);
        result.put(male);

        return result;
    }

    public JSONArray registertimedata(){
        JSONArray result = new JSONArray();
        ArrayList<MemberBean> memberBeans = (ArrayList)memberRepository.findByOrderByMemberregistertimeAsc();
        for(MemberBean memberBean : memberBeans){
            JSONObject data = new JSONObject(new LinkedHashMap<>());

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(memberBean.getMemberregistertime());

            Integer year = calendar.get(Calendar.YEAR);
            Integer month = calendar.get(Calendar.MONTH) + 1;
            Integer day = calendar.get(Calendar.DAY_OF_MONTH);
            String tempdate =year +"/"+ month.toString()+"/"+day.toString();
            switch (result.length()){
                case 0:
                    data.put("name",tempdate);
                    data.put("value",1);
                    result.put(data);
                    break;

                default:
                    JSONObject predata= (JSONObject) result.get(result.length()-1);
                    String prename = predata.getString("name");
                    Integer prevalue = predata.getInt("value");

                    if(tempdate.equals(prename)){

                        data.put("name",tempdate);
                        data.put("value",prevalue+1);
                        result.remove(result.length()-1);
                        result.put(data);
                    }else {
                        data.put("name",tempdate);
                        data.put("value",1);
                        result.put(data);
                    }
                    break;
            }
        }
        return result;
    }
}
