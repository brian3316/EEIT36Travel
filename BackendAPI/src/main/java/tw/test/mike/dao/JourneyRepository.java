package tw.test.mike.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.test.mike.bean.JourneyBean;

public interface JourneyRepository extends JpaRepository<JourneyBean, Integer> {

}
